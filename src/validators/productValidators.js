import yup from 'yup';

const productSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    image_url: yup.string().required(),
});

export default productSchema;