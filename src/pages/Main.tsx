import { useState } from "react";
import { FormUseXLSX } from "../components/form/Form";
import { NormalizeLitoral } from "../components/normalize_aire_litoral_litoral";

const options = "0"
const excels = "1"
const litoral = "2"

export default function Main() {
    const [selected, setSelected] = useState<string>(options);
    return (
        <div className="bg-zinc-700 h-screen">
            {selected === options && <div className="w-full flex gap-2 px-5 pt-5">
                <div>
                    <button type="button" onClick={() => setSelected(excels)} className="bg-zinc-900 text-white px-4 py-2 rounded-md">
                        EXCELS
                    </button>
                </div>
                <div>
                    <button type="button" onClick={() => setSelected(litoral)} className="bg-zinc-900 text-white px-4 py-2 rounded-md">
                        LITORAL
                    </button>
                </div>
            </div>}

            {selected === litoral && <NormalizeLitoral />}
            {selected === excels && <FormUseXLSX />}
        </div>
    )
}