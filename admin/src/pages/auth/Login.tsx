import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { LoginFormValidator } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof LoginFormValidator>>({
    resolver: zodResolver(LoginFormValidator),
    defaultValues: {
      email: "",
    },
  });

  function submitHandler(values: z.infer<typeof LoginFormValidator>) {
    console.log(values);
    navigate("/");
  }

  return (
    <section className="flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="flex flex-col gap-6 p-4 w-full max-w-md"
        >
          <div className="text-center">
            <h2 className="section-title">Wellcome Back</h2>
            <p className="section-subtitle text-muted">
              Welcome back! Please enter your details.
            </p>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
};

export default Login;
