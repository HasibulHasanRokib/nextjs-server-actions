import ForgetPasswordForm from "@/components/auth/forgetPasswordForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ForgetPassword() {
  return (
    <div className="mx-auto flex h-[500px] max-w-5xl items-center justify-center p-4">
        <Card className="md:w-[550px] w-full">
          <CardHeader className="text-center">
            <CardTitle>Forget password</CardTitle>
            <CardDescription>To verify your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <ForgetPasswordForm />
          </CardContent>
        </Card>
    </div>
  );
}
