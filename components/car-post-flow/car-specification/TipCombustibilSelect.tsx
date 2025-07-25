import { Masina } from "@/types/app-types";
import React, { useState } from "react";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { tipCombustibilOptions } from "@/utils/constants";
import { formatLabel } from "@/utils/format-utils";

const TipCombustibilSelect = ({
  initTipCombustibil,
}: {
  initTipCombustibil: Masina["tip_combustibil"];
}) => {
  const [tipCombustibil, setTipCombustibil] = useState(initTipCombustibil);

  return (
    <>
      <Label htmlFor="tip_combustibil">Tipul combustibilului</Label>
      <Select
        value={tipCombustibil || "necompletat"}
        onValueChange={(value) =>
          setTipCombustibil(value as Masina["tip_combustibil"])
        }
      >
        <SelectTrigger size="sm" className="mb-2 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            className="text-muted-foreground italic"
            key="necompletat"
            value="necompletat"
          >
            Necompletat
          </SelectItem>
          {tipCombustibilOptions.map((value) => (
            <SelectItem key={value} value={value}>
              {formatLabel(value)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input
        type="hidden"
        id="tip_combustibil"
        name="tip_combustibil"
        value={tipCombustibil || "necompletat"}
      />
    </>
  );
};

export default TipCombustibilSelect;
