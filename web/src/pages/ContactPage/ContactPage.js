import {
  Form,
  FormError,
  Label,
  TextField,
  TextAreaField,
  FieldError,
  Submit,
  useMutation,
} from '@redwoodjs/web'
import BlogLayout from 'src/layouts/BlogLayout'
import { useForm } from 'react-hook-form'

const CREATE_CONTACT = gql`
  mutation createContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm()
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      formMethods.reset()
      alert('Thank you for your message!')
    },
  })

  const onSubmit = (input) => {
    create({ variables: { input } })
  }
  return (
    <BlogLayout>
      <fieldset disabled={loading}>
        <Form
          onSubmit={onSubmit}
          validation={{ mode: 'onBlur' }}
          formMethods={formMethods}
          error={error}
        >
          <FormError error={error} />
          <Label errorClassName="error" name="name">
            Your name
          </Label>
          <TextField
            name="name"
            errorClassName="error"
            validation={{ required: true }}
          />
          <FieldError className="error" name="name" />

          <Label errorClassName="error" name="email">
            Your email
          </Label>
          <TextField
            name="email"
            errorClassName="error"
            validation={{ required: true }}
          />
          <FieldError className="error" name="email" />

          <Label errorClassName="error" name="message">
            Your message
          </Label>
          <TextAreaField
            name="message"
            errorClassName="error"
            validation={{ required: true }}
          />
          <FieldError className="error" name="message" />

          <Submit>Save</Submit>
        </Form>
      </fieldset>
    </BlogLayout>
  )
}

export default ContactPage
