import { ResponseUseForm } from "../../../types_use"
import { Button } from "./Button"
import { InputNumber } from "./InputNumber"
import { InputRadio } from "./InputRadio"
import { InputText } from "./InputText"
import { Select } from "./Select"
import { Textarea } from "./Textarea"

export function InputTextForm<T>({ key_value, title, formResponse }: { key_value: keyof T, title: string, formResponse: ResponseUseForm<T> }) {
    const { valores, errores, onChangeValores, } = { ...formResponse }

    return (
        <InputText
            key_value={key_value?.toString()}
            onChange={onChangeValores}
            title={title}
            value={valores[key_value]}
            error={errores[key_value]?.message}
            status_error={!errores[key_value]?.status}
        />
    )
}

export function TextareaForm<T>({ key_value, title, formResponse }: { key_value: keyof T, title: string, formResponse: ResponseUseForm<T> }) {
    const { valores, errores, onChangeValores, } = { ...formResponse }

    return (
        <Textarea
            key_value={key_value?.toString()}
            onChange={onChangeValores}
            title={title}
            value={valores[key_value]}
            error={errores[key_value]?.message}
            status_error={!errores[key_value]?.status}
        />
    )
}

export function InputNumberForm<T>({ key_value, title, formResponse }: { key_value: keyof T, title: string, formResponse: ResponseUseForm<T> }) {
    const { valores, errores, onChangeValores, } = { ...formResponse }

    return (
        <InputNumber
            key_value={key_value?.toString()}
            onChange={onChangeValores}
            title={title}
            value={valores[key_value]}
            error={errores[key_value]?.message}
            status_error={!errores[key_value]?.status}
        />
    )
}

export function InputRadioForm<T>({ key_value, title, value, value_selected, formResponse }: { key_value: keyof T, title: string, value: string, value_selected: string, formResponse: ResponseUseForm<T> }) {
    const { onChangeValores } = { ...formResponse }

    return (
        <InputRadio
            onChange={() => onChangeValores({
                key: key_value,
                value: value_selected,
            })}
            value={value}
            name={key_value?.toString()}
            key_value={"types_products_vessel"}
            checked={value === value_selected}
            title={title}
        />
    )
}

export function InputPasswordForm<T>({ key_value, title, formResponse }: { key_value: keyof T, title: string, formResponse: ResponseUseForm<T> }) {
    const { valores, errores, onChangeValores, } = { ...formResponse }

    return (
        <InputText
            key_value={key_value?.toString()}
            onChange={onChangeValores}
            title={title}
            value={valores[key_value]}
            error={errores[key_value]?.message}
            status_error={!errores[key_value]?.status}
        />
    )
}

export function SelectForm<T>({ key_value, title, formResponse, options }: {
    options: {
        value: string;
        label: string;
    }[], key_value: keyof T, title: string, formResponse: ResponseUseForm<T>
}) {
    const { valores, errores, onChangeValores } = { ...formResponse }

    return (
        <Select
            key_value={key_value?.toString()}
            onChange={onChangeValores}
            title={title}
            value={valores[key_value]?.toString() ?? "0"}
            options={options}
            error={errores[key_value]?.message}
            status_error={!errores[key_value]?.status}
        />
    )
}

export function BTNSubmitForm<T>({ textLoading = "Cargando...", textNormal = "Guardar", className = "", formResponse }: { textLoading?: string, textNormal?: string, className?: string, formResponse: ResponseUseForm<T> }) {
    const { loadingForm } = { ...formResponse }

    return (
        <Button
            className={className}
            type="submit"
            disabled={loadingForm}
        >
            {loadingForm ? textLoading : textNormal}
        </Button>
    )
}

export function Form<T>({ className, children, formResponse }: { className: string, children: JSX.Element, formResponse: ResponseUseForm<T> }) {
    const classNameUse = "flex flex-col " + className
    const { onSubmit } = { ...formResponse }

    return (
        <form onSubmit={onSubmit} className={classNameUse}>
            {children}
        </form>
    )
}