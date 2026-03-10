import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/ui/image-upload";

const categoryTypes = [
    { label: "私募管理人", value: "1" },
    { label: "三方销售机构", value: "2" },
] as const;

const formSchema = z.object({
    fullName: z
        .string()
        .min(2, "机构名称至少 2 个字符")
        .max(32, "机构名称最多 32 个字符"),
    categoryType: z
        .string()
        .min(1, "请选择资质类型"),
    logo: z
        .string({ message: "请上传机构 Logo" })
        .min(1, "请上传机构 Logo"),
})

export default function AgencyCreatePage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            categoryType: "",
            logo: "",
        },
    });

    function formReset() {
        form.reset();
    }

    function onSubmit(data: z.infer<typeof formSchema>) {
        toast("提交成功", {
            description: (
                <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
            position: "bottom-right",
            classNames: {
                content: "flex flex-col gap-2",
            },
            style: {
                "--border-radius": "calc(var(--radius)  + 4px)",
            } as React.CSSProperties,
        })
    }

    return (
        <div className="grid justify-items-center items-start min-h-screen">
            <Card className="w-full sm:max-w-md">
                <CardHeader className="text-center">
                    <CardTitle>新增机构</CardTitle>
                </CardHeader>
                <CardContent>
                    <form id="form-agency-create" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller name="fullName" control={form.control} render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="agency-fullName">机构名称</FieldLabel>
                                    <Input
                                        {...field}
                                        id="agency-fullName"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="请填写机构名称"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                </Field>
                            )}
                            />
                            <Controller name="categoryType" control={form.control} render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="agency-categoryType">资质类型</FieldLabel>
                                    <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="cursor-pointer" id="agency-categoryType" aria-invalid={fieldState.invalid}>
                                            <SelectValue placeholder="请选择" />
                                        </SelectTrigger>
                                        <SelectContent position="item-aligned">
                                            {categoryTypes.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                </Field>
                            )}
                            />
                            <Controller name="logo" control={form.control} render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>机构 Logo</FieldLabel>
                                    <ImageUpload
                                        value={field.value}
                                        onChange={field.onChange}
                                        action="/file/upload"
                                    />
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                </Field>
                            )}
                            />
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                    <Field orientation="horizontal" className="flex justify-center gap-4">
                        <Button type="button" variant="outline" onClick={formReset}>还原</Button>
                        <Button type="submit" form="form-agency-create">提交</Button>
                    </Field>
                </CardFooter>
            </Card>
        </div>
    )
}
