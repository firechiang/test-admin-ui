import * as React from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {toast} from "sonner";
import * as z from "zod";

import {Button} from "@/components/ui/button";
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
import {Input} from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const strategyTags = [
    {label: "股票策略", value: "1"},
    {label: "量化", value: "2"},
    {label: "宏观对冲等", value: "3"},
] as const;


const formSchema = z.object({
    fullName: z
        .string()
        .min(5, "Bug title must be at least 5 characters.")
        .max(32, "Bug title must be at most 32 characters."),
    filingCode: z.string()
        .min(5, "Bug title must be at least 5 characters.")
        .max(32, "Bug title must be at most 32 characters."),
    strategyTag: z.string()
        .min(1, "Bug title must be at least 5 characters.")
        .max(3, "Bug title must be at most 32 characters."),
    createDate: z.string()
        .min(5, "Bug title must be at least 5 characters.")
        .max(32, "Bug title must be at most 32 characters."),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters.")
        .max(100, "Description must be at most 100 characters."),
})

export default function ProductCreatePage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            description: "",
        },
    });
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    function formReset() {
        setDate(undefined);
        form.reset();
    }

    function onSubmit(data: z.infer<typeof formSchema>) {
        toast("You submitted the following values:", {
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
                    <CardTitle>产品新增</CardTitle>
                </CardHeader>
                <CardContent>
                    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller name="fullName" control={form.control} render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">产品全称</FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Login button not working on mobile"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                                </Field>
                            )}
                            />
                            <Controller name="filingCode" control={form.control} render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">备案编码</FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Login button not working on mobile"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                                </Field>
                            )}
                            />
                            <Controller name="strategyTag" control={form.control} render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">策略标签</FieldLabel>
                                    <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="cursor-pointer" id="form-rhf-select-language" aria-invalid={fieldState.invalid}>
                                            <SelectValue placeholder="请选择"/>
                                        </SelectTrigger>
                                        <SelectContent position="item-aligned">
                                            {strategyTags.map((language) => (
                                                <SelectItem key={language.value} value={language.value}>
                                                    {language.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                                </Field>
                            )}
                            />
                            <Controller name="createDate" control={form.control} render={({fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="date">成立日期</FieldLabel>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild className="cursor-pointer">
                                            <Button variant="outline" id="date" className="justify-start">
                                                {date ? date.toLocaleDateString() : <span className="font-normal text-muted-foreground">请选择</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                            <Calendar mode="single" selected={date} defaultMonth={date}
                                                      captionLayout="dropdown" onSelect={(date) => {
                                                setDate(date)
                                                setOpen(false)
                                            }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                                </Field>
                            )}
                            />
                            <Controller name="fullName" control={form.control} render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">基金管理人</FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Login button not working on mobile"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                                </Field>
                            )}
                            >
                            </Controller>
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                    <Field orientation="horizontal" className="flex justify-center gap-4">
                        <Button type="button" variant="outline" onClick={formReset}>还原</Button>
                        <Button type="submit" form="form-rhf-demo">提交</Button>
                    </Field>
                </CardFooter>
            </Card>
        </div>
    )
}
