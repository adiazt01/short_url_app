"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Group } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function FilterSelect() {
  const [groups, setGroups] = useState<Group[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await fetch("/api/group");
      const data = await res.json();
      setGroups(data);
    };
    fetchGroups();
  }, []);

  const handleOnChange = (event: string) => {
    const params = new URLSearchParams(searchParams);
    if (event === "None") {
      params.delete("group");
    } else {
      params.set("group", event);
    }
    params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <Label
        htmlFor="filter"
        className="block text-sm font-medium text-gray-700"
      >
        Filter
      </Label>
      <Select
        disabled={groups.length === 0}
        onValueChange={(e) => handleOnChange(e)}
        defaultValue={searchParams.get("group") || "None"}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a group" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="None">All</SelectItem>
          {groups.map((group) => (
            <SelectItem key={group.id} value={group.name}>
              {group.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
