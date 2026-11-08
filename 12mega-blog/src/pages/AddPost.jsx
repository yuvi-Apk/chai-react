import { Container, PostForm } from "@/components";

const AddPost = () => {
    return (
        <div className="py-8">
            <Container>
                <h1 className="mb-6 px-2 text-2xl font-bold text-white">Add Post</h1>
                <PostForm />
            </Container>
        </div>
    );
};

export default AddPost;
