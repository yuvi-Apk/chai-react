import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import service from "@/appwrite/service";
import { Button, Input, RTE, Select } from "../index";

// Turns a title into a valid Appwrite row ID:
// lowercase a-z, 0-9 and "-", no leading/trailing dash, max 36 chars.
const slugify = (value) =>
    (value || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/[\s-]+/g, "-")
        .slice(0, 36)
        .replace(/^-+|-+$/g, "");

// Used for both creating (no `post` prop) and editing (pass the existing `post`).
const PostForm = ({ post }) => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const submit = async (data) => {
        if (post) {
            // Editing: upload a new image only if one was picked, then remove the old one.
            const file = data.image?.[0] ? await service.uploadFile(data.image[0], userData.$id) : null;
            if (file) await service.deleteFile(post.featuredImage);

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
            });
            if (dbPost) navigate(`/post/${dbPost.$id}`);
        } else {
            const file = await service.uploadFile(data.image[0], userData.$id);
            if (!file) return;

            const dbPost = await service.createPost({
                ...data,
                featuredImage: file.$id,
                userId: userData.$id,
            });
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            } else {
                // Post failed to save, so don't leave an orphan image in the bucket.
                await service.deleteFile(file.$id);
            }
        }
    };

    const slugTransform = useCallback((value) => slugify(value), []);

    // Keep the slug in sync while the title is typed (create mode only,
    // because an existing post's slug is its row ID and can't change).
    useEffect(() => {
        if (post) return;
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue, post]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-y-6">
            <div className="w-full px-2 lg:w-2/3">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-1"
                    {...register("title", { required: "Title is required" })}
                />
                {errors.title && <p className="mb-3 pl-1 text-sm text-red-400">{errors.title.message}</p>}

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-1"
                    readOnly={!!post}
                    {...register("slug", { required: "Slug is required" })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {errors.slug && <p className="mb-3 pl-1 text-sm text-red-400">{errors.slug.message}</p>}

                <div className="mt-4">
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
            </div>

            <div className="w-full px-2 lg:w-1/3">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-1"
                    accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                    {...register("image", { required: post ? false : "Featured image is required" })}
                />
                {errors.image && <p className="mb-3 pl-1 text-sm text-red-400">{errors.image.message}</p>}

                {post && (
                    <div className="mb-4 w-full">
                        <img
                            src={service.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status :"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-600" : "bg-indigo-600"}
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Saving..." : post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
};

export default PostForm;
