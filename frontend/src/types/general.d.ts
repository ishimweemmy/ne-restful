type TUser = {
  id: number | undefined;
  email: string;
  firstName: string;
  lastName: string;
};

type TAuthTokens = {
  refresh: string;
  access: string;
};

type TCProps = {
  children: ReactNode;
};

type TInputField = {
  id: string;
  label: string;
  extra?: string;
  placeholder: string;
  variant: string;
  state?: string;
  disabled?: boolean;
  type?: string;
  name: string;
  value?: string;
  error?: FieldError | any;
  register: UseFormRegister<any>;
  inputStyles?: string;
};

type TSelectOption<TValue> = {
  label: string;
  value: TValue[];
};

type TSelectField = Pick<
  TInputField,
  "inputStyles"
> & {
  isMulti: boolean;
  options: TSelectOption[];
};

type TBook = {
  id: string;
  name: string;
  author: string;
  publisher: string;
  publicationYear: number;
  subject: string;
  createdAt: string;
  updatedAt: string;
}

type TParams = {
  page?: number;
  limit?: number;
};