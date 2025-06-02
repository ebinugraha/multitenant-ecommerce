import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-10">
      <Input className="mb-3"/>
      <Button variant={"elevated"}>
        Test
      </Button>
      <Progress className="mt-3" value={50}/>
      <Textarea className="mt-3"/>
      <Checkbox className="mt-3"/>
    </div>
  );
}
