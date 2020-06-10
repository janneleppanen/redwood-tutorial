import {
  Form,
  Label,
  TextField,
  TextAreaField,
  FieldError,
  Submit,
  useMutation,
} from '@redwoodjs/web'
import BlogLayout from 'src/layouts/BlogLayout'

const CREATE_CONTACT = gql`
  mutation createContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const [create] = useMutation(CREATE_CONTACT)

  const onSubmit = (input) => {
    create({ variables: { input } })
  }
  return (
    <BlogLayout>
      <Form onSubmit={onSubmit} validation={{ mode: 'onBlur' }}>
        <Label errorClassName="error" name="name"></Label>
        <TextField
          name="name"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError className="error" name="name" />

        <Label errorClassName="error" name="email"></Label>
        <TextField
          name="email"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError className="error" name="email" />

        <Label errorClassName="error" name="message"></Label>
        <TextAreaField
          name="message"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError className="error" name="message" />

        <Submit>Save</Submit>
      </Form>
    </BlogLayout>
  )
}

export default ContactPage
