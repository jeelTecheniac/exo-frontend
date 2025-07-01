import Typography from "../lib/components/atoms/Typography";
import Button from "../lib/components/atoms/Button";
import Password from "../lib/components/atoms/Password";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import authService from "../services/auth.service";
import { toast } from "react-toastify";
import localStorageService from "../services/local.service";
import { useNavigate } from "react-router";

const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState<
    "week" | "acceptable" | "strong" | ""
  >("");

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, t("password_min_length"))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
        t("password_requirements")
      )
      .required(t("password_required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("passwords_must_match"))
      .required(t("confirm_password_required")),
  });
  const resetPasswordMutate = useMutation({
    mutationFn: async (data: any) => {
      await authService.resetPassword(data);
    },
    onSuccess: () => {
      toast.success(t("password_reset_successful"));
      navigate("/sign-in");
    },
    onError: (error) => {
      console.error("Error during sign up:", error);
      toast.error(t("sign_up_error"));
    },
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      const emailString = localStorageService.getEmail() as string;
      const email = JSON.parse(emailString);
      const data = {
        email: email,
        new_password: values.password,
        conf_new_password: values.confirmPassword,
      };
      resetPasswordMutate.mutate(data);
    },
  });

  const checkPasswordStrength = (password: string) => {
    if (password.length < 8) return "week";
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@$!%*#?&]/.test(password);

    if (hasLetter && hasNumber && hasSpecial) return "strong";
    if (
      (hasLetter && hasNumber) ||
      (hasLetter && hasSpecial) ||
      (hasNumber && hasSpecial)
    )
      return "acceptable";
    return "week";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    formik.handleChange(e);
    setPasswordStrength(checkPasswordStrength(password));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div variants={itemVariants}>
        <Typography
          weight="extrabold"
          className="text-[28px] text-secondary-100 mt-10"
        >
          {t("set_new_password")}
        </Typography>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Typography
          weight="normal"
          size="sm"
          className="text-secondary-60 mt-1.5"
        >
          {t("create_a_strong_new_password_to_secure_your_account")}
        </Typography>
      </motion.div>
      <form onSubmit={formik.handleSubmit}>
        <motion.div className="mt-4" variants={itemVariants}>
          <Password
            passwordType={passwordStrength}
            labelProps={{
              htmlFor: "password",
              children: `${t("password")}`,
            }}
            name="password"
            value={formik.values.password}
            onChange={handlePasswordChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            hint={formik.touched.password ? formik.errors.password : undefined}
          />
        </motion.div>
        <motion.div className="mt-4" variants={itemVariants}>
          <Password
            labelProps={{
              htmlFor: "confirmPassword",
              children: `${t("confirm_password")}`,
            }}
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            hint={
              formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : undefined
            }
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            variant="primary"
            className="py-3 mt-4"
            type="submit"
            disable={!formik.isValid || resetPasswordMutate.isPending}
          >
            {t("reset_password")}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ResetPasswordForm;
