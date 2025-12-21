import {Button} from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Field, FieldDescription, FieldGroup, FieldLabel,} from "@/components/ui/field";
import {Input} from "@/components/ui/input";

import {useNavigate} from "react-router";
import {useState} from "react";
import {useAuth} from "@/components/auth-context";


export default function Login() {
    const {login} = useAuth();
    // 获取跳转方法
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uname, setUname] = useState("");
    const [pwd, setPwd] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // 登陆
            await login(uname, pwd);
            // 登陆成功，跳转
            navigate("/dashboard", {replace: true});
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>登陆你的账号</CardTitle>
                            <CardDescription>
                                请在下方输入您的用户名密码以登录您的帐户
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLogin}>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="username">用户名</FieldLabel>
                                        <Input id="username" value={uname} onChange={(e) => setUname(e.target.value)}
                                               disabled={loading} required/>
                                    </Field>
                                    <Field>
                                        <div className="flex items-center">
                                            <FieldLabel htmlFor="password">密码</FieldLabel>
                                            <a href="#"
                                               className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                                忘记密码?
                                            </a>
                                        </div>
                                        <Input id="password" value={pwd} onChange={(e) => setPwd(e.target.value)}
                                               disabled={loading} required/>
                                    </Field>
                                    <Field>
                                        <Button type="submit" disabled={loading} className="cursor-pointer">
                                            {loading ? <Spinner/> : "登陆"}
                                        </Button>
                                        <FieldDescription className="text-center">
                                            没有账号? <a href="#">注册</a>
                                        </FieldDescription>
                                    </Field>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}