import * as React from "react"
import { cn } from "@/lib/utils"
import { ImagePlus, Loader2, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { api } from "@/utils/http"

interface ImageUploadProps {
    /** 表单绑定值：后端返回的图片地址 */
    value?: string | null
    /** 值变更回调（传入后端返回的图片地址，或 null 表示清除） */
    onChange?: (url: string | null) => void
    /** 上传接口地址 */
    action: string
    /** 上传文件的字段名，默认 "file" */
    fieldName?: string
    /** 最大文件大小（字节），默认 5MB */
    maxSize?: number
    /** 接受的文件类型，默认 image/* */
    accept?: string
    className?: string
    disabled?: boolean
}

function ImageUpload({
    value = null,
    onChange,
    action,
    fieldName = "file",
    maxSize = 5 * 1024 * 1024,
    accept = "image/*",
    className,
    disabled = false,
}: ImageUploadProps) {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [preview, setPreview] = React.useState<string | null>(null)
    const [uploading, setUploading] = React.useState(false)
    const [isDragging, setIsDragging] = React.useState(false)

    // 当 value 变化时同步预览（value 是后端返回的 URL）
    React.useEffect(() => {
        if (!value) {
            setPreview(null)
        } else {
            setPreview(value)
        }
    }, [value])

    // 校验并上传文件
    const validateAndUpload = React.useCallback(
        async (file: File) => {
            if (!file.type.startsWith("image/")) {
                toast.error("请选择图片文件")
                return
            }
            if (file.size > maxSize) {
                const sizeMB = (maxSize / 1024 / 1024).toFixed(0)
                toast.error(`图片大小不能超过 ${sizeMB}MB`)
                return
            }

            // 先用本地 URL 做即时预览
            const localPreview = URL.createObjectURL(file)
            setPreview(localPreview)
            setUploading(true)

            try {
                const formData = new FormData()
                formData.append(fieldName, file)
                // api 的响应拦截器会自动提取 response.data.result
                const result = await api.post<any, string>(action, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                // result 即为后端返回的图片地址
                onChange?.(result)
                toast.success("图片上传成功")
            } catch {
                // 上传失败时清除预览
                setPreview(null)
                onChange?.(null)
            } finally {
                URL.revokeObjectURL(localPreview)
                setUploading(false)
            }
        },
        [maxSize, fieldName, action, onChange]
    )

    const handleClick = () => {
        if (!disabled && !uploading) {
            inputRef.current?.click()
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            validateAndUpload(file)
        }
        // 重置 input 以允许重新选择相同文件
        e.target.value = ""
    }

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation()
        onChange?.(null)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!disabled && !uploading) {
            setIsDragging(true)
        }
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        if (disabled || uploading) return

        const file = e.dataTransfer.files?.[0]
        if (file) {
            validateAndUpload(file)
        }
    }

    const isDisabled = disabled || uploading

    return (
        <div
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
                "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors cursor-pointer overflow-hidden",
                "w-full aspect-video",
                isDragging
                    ? "border-primary bg-primary/5"
                    : "border-input hover:border-primary/50 hover:bg-accent/50",
                isDisabled && "pointer-events-none opacity-50",
                className
            )}
        >
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
                disabled={isDisabled}
            />

            {preview ? (
                <>
                    <img
                        src={preview}
                        alt="预览"
                        className="h-full w-full object-contain"
                    />
                    {/* 上传中遮罩 */}
                    {uploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                            <Loader2 className="size-8 animate-spin text-primary" />
                        </div>
                    )}
                    {/* 删除按钮（上传完成后才显示） */}
                    {!isDisabled && (
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-destructive text-white shadow-md transition-opacity hover:bg-destructive/90"
                        >
                            <Trash2 className="size-4" />
                        </button>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center gap-2 p-6 text-muted-foreground">
                    <ImagePlus className="size-10 opacity-50" />
                    <div className="text-sm font-medium">
                        点击或拖拽图片到此处上传
                    </div>
                    <div className="text-xs opacity-70">
                        支持 JPG、PNG、GIF，最大 {(maxSize / 1024 / 1024).toFixed(0)}MB
                    </div>
                </div>
            )}
        </div>
    )
}

export { ImageUpload }
export type { ImageUploadProps }
