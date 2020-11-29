import * as yup from "yup";

export const expenseListSchema = yup.object().shape({
  type: yup.string().oneOf(["income", "expenditure"]).trim(),
  source: yup.string().required().trim(),
  amount: yup.number().required(),
  account: yup.string().oneOf(["paytm", "hdfc"]).required(),
  timestamp: yup.number().default(() => {
    return +new Date();
  }),
  date: yup.number().required(),
  comments: yup.string().trim(),
});

export const expenseIdSchema = yup.object().shape({
  id: yup.string().required().trim(),
});
