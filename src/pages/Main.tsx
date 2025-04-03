import { useState } from "react";
import { FormUseXLSX } from "../components/form/Form";
import { NormalizeLitoral } from "../components/normalize_aire_litoral_litoral";
import { NormalizeHilados } from "../components/normalize_hilados";
import { NormalizeLPTECFIL } from "../components/normalize_lptecfil";

const options = "0"
const excels = "1"
const litoral = "2"
const hilados = "3"
const lptecfil = "4"

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
                <div>
                    <button type="button" onClick={() => setSelected(hilados)} className="bg-zinc-900 text-white px-4 py-2 rounded-md">
                        HILADOS
                    </button>
                </div>
                <div>
                    <button type="button" onClick={() => setSelected(lptecfil)} className="bg-zinc-900 text-white px-4 py-2 rounded-md">
                        LPTEC/FIL
                    </button>
                </div>
            </div>}

            {selected === litoral && <NormalizeLitoral />}
            {selected === excels && <FormUseXLSX />}
            {selected === hilados && <NormalizeHilados />}
            {selected === lptecfil && <NormalizeLPTECFIL />}
        </div>
    )
}