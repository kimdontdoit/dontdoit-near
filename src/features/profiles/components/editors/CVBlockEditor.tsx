import { useState, useMemo } from "react";
import { CVBlock, WorkExperience } from "@/features/profiles/types/profile-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Plus, Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/cn";
import { generateUUID } from "@/lib/utils";
import {
  splitMonthYear,
  toMonthYear,
  formatDateRange,
  MONTH_OPTIONS,
  getYearOptions
} from "@/features/profiles/lib/dateUtils";
import { CV_DATE_CONSTANTS } from "@/features/profiles/lib/constants";

interface CVBlockEditorProps {
  block: CVBlock;
  onChange: (updatedBlock: CVBlock) => void;
  onClose: () => void;
}

export const CVBlockEditor = ({
  block,
  onChange,
  onClose
}: CVBlockEditorProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const experiences = block.content.experiences || [];
  const yearOptions = useMemo(() => getYearOptions(), []);

  const addExperience = () => {
    const now = new Date();
    const startDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const newExperience: WorkExperience = {
      id: generateUUID(),
      startDate,
      endDate: null, // Present
      title: "",
      company: "",
      location: ""
    };

    onChange({
      ...block,
      content: {
        ...block.content,
        experiences: [...experiences, newExperience]
      }
    });

    // Auto-expand the new experience
    setEditingIndex(experiences.length);
  };

  const removeExperience = (index: number) => {
    const updated = experiences.filter((_, i) => i !== index);
    onChange({
      ...block,
      content: {
        ...block.content,
        experiences: updated
      }
    });

    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const updateExperience = (index: number, field: keyof WorkExperience, value: string | null) => {
    const updated = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );

    onChange({
      ...block,
      content: {
        ...block.content,
        experiences: updated
      }
    });
  };

  // Sort experiences by start date (most recent first) for display
  // Memoized to avoid re-sorting on every render
  const sortedExperiences = useMemo(() => {
    return experiences
      .map((exp, originalIndex) => ({ exp, originalIndex }))
      .sort((a, b) => {
        return b.exp.startDate.localeCompare(a.exp.startDate);
      });
  }, [experiences]);

  return (
    <Card className="h-full w-full flex flex-col border-0 rounded-none shadow-none animate-in slide-in-from-right duration-200">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b space-y-0">
        <CardTitle className="text-lg">Edit Work Experience</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose} className="-mr-2">
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      <ScrollArea className="flex-1">
        <CardContent className="p-4 space-y-3">
          {sortedExperiences.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm mb-4">No work experience added yet.</p>
              <Button onClick={addExperience} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {sortedExperiences.map(({ exp, originalIndex }) => {
                const isEditing = editingIndex === originalIndex;
                const startParts = splitMonthYear(exp.startDate);
                const endParts = splitMonthYear(exp.endDate ?? exp.startDate);
                const isCurrent = exp.endDate === null;
                const yearRange = formatDateRange(exp.startDate, exp.endDate);

                return (
                  <div
                    key={exp.id}
                    className={cn(
                      "border rounded-lg transition-colors",
                      isEditing ? "border-primary bg-primary/5" : "border-border"
                    )}
                  >
                    {/* Collapsed View */}
                    {!isEditing && (
                      <div className="w-full p-3 flex items-center gap-3 group/item">
                        <button
                          onClick={() => setEditingIndex(originalIndex)}
                          className="flex-1 flex items-center gap-3 text-left hover:opacity-80 transition-opacity min-w-0"
                        >
                          <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold truncate">
                              {exp.title || "Untitled Position"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {exp.company || "Company"} • {yearRange}
                            </div>
                          </div>
                        </button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeExperience(originalIndex);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    {/* Expanded Edit Form */}
                    {isEditing && (
                      <div className="p-3 space-y-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-muted-foreground">
                            Edit Experience
                          </span>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeExperience(originalIndex)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingIndex(null)}
                            >
                              Done
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label className="text-xs">Start Date</Label>
                            <div className="flex gap-2">
                              <Select
                                value={startParts.month}
                                onValueChange={(value) =>
                                  updateExperience(
                                    originalIndex,
                                    "startDate",
                                    toMonthYear(startParts.year, value)
                                  )
                                }
                              >
                                <SelectTrigger className="h-8 text-sm">
                                  <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value={CV_DATE_CONSTANTS.YEAR_ONLY_SENTINEL}>Year only</SelectItem>
                                  {MONTH_OPTIONS.map((month) => (
                                    <SelectItem key={month.value} value={month.value}>
                                      {month.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select
                                value={startParts.year}
                                onValueChange={(value) =>
                                  updateExperience(
                                    originalIndex,
                                    "startDate",
                                    toMonthYear(value, startParts.month)
                                  )
                                }
                              >
                                <SelectTrigger className="h-8 text-sm">
                                  <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                  {yearOptions.map((year) => (
                                    <SelectItem key={year} value={year}>
                                      {year}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <Label className="text-xs">End Date</Label>
                              <div className="flex items-center gap-2">
                                <Label className="text-[11px] text-muted-foreground">
                                  Current
                                </Label>
                                <Switch
                                  checked={isCurrent}
                                  onCheckedChange={(checked) =>
                                    updateExperience(
                                      originalIndex,
                                      "endDate",
                                      checked ? null : exp.startDate
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Select
                                value={endParts.month}
                                onValueChange={(value) =>
                                  updateExperience(
                                    originalIndex,
                                    "endDate",
                                    toMonthYear(endParts.year, value)
                                  )
                                }
                                disabled={isCurrent}
                              >
                                <SelectTrigger className="h-8 text-sm">
                                  <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value={CV_DATE_CONSTANTS.YEAR_ONLY_SENTINEL}>Year only</SelectItem>
                                  {MONTH_OPTIONS.map((month) => (
                                    <SelectItem key={month.value} value={month.value}>
                                      {month.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select
                                value={endParts.year}
                                onValueChange={(value) =>
                                  updateExperience(
                                    originalIndex,
                                    "endDate",
                                    toMonthYear(value, endParts.month)
                                  )
                                }
                                disabled={isCurrent}
                              >
                                <SelectTrigger className="h-8 text-sm">
                                  <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                  {yearOptions.map((year) => (
                                    <SelectItem key={year} value={year}>
                                      {year}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor={`title-${exp.id}`} className="text-xs">
                            Job Title
                          </Label>
                          <Input
                            id={`title-${exp.id}`}
                            value={exp.title}
                            onChange={(e) =>
                              updateExperience(originalIndex, "title", e.target.value)
                            }
                            placeholder="Senior Designer"
                            className="h-8 text-sm"
                          />
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor={`company-${exp.id}`} className="text-xs">
                            Company
                          </Label>
                          <Input
                            id={`company-${exp.id}`}
                            value={exp.company}
                            onChange={(e) =>
                              updateExperience(originalIndex, "company", e.target.value)
                            }
                            placeholder="Company Name"
                            className="h-8 text-sm"
                          />
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor={`location-${exp.id}`} className="text-xs">
                            Location
                          </Label>
                          <Input
                            id={`location-${exp.id}`}
                            value={exp.location}
                            onChange={(e) =>
                              updateExperience(originalIndex, "location", e.target.value)
                            }
                            placeholder="San Francisco, CA"
                            className="h-8 text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {experiences.length > 0 && (
            <Button onClick={addExperience} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          )}
        </CardContent>
      </ScrollArea>

      <CardFooter className="p-4 border-t bg-muted/50 text-xs text-muted-foreground">
        Changes are previewed live. Close to revert if not saved.
      </CardFooter>
    </Card>
  );
};
