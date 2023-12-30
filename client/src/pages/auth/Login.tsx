import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { LoginValidation } from "@/lib/validations";
import { useLogin } from "@/lib/react-query/queries";
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

const Login = () => {
  //   React Query
  const { mutateAsync, isPending: isPendingLogin } = useLogin();

  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const submitHandler = async (values: z.infer<typeof LoginValidation>) => {
    await mutateAsync({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex flex-col gap-8"
      >
        <div>
          <h2 className="flex gap-2 mb-2">
            <span className="text-[26px] lg:text-[32px]">Wellcome</span>
            <img className="w-4 h-4" src="/assets/icons/hand.png" alt="hand" />
          </h2>
          <p className="text-[#A4A1B2] text-1">Please login here</p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email Address <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>
                Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPendingLogin} type="submit">
          Submit
        </Button>

        <p>
          <Link to={"/create-account"}>Craete an account ?</Link>
        </p>
      </form>
    </Form>
  );
};

export default Login;
