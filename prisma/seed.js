import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    title: "Clean Code",
    description:
      "A practical guide for writing clean, readable and maintainable software code.",
    price: 45,
    stock: 50,
    image_url:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
    category: "Books",
  },
  {
    title: "The Pragmatic Programmer",
    description:
      "Classic programming book teaching professional software development practices.",
    price: 50,
    stock: 40,
    image_url:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80",
    category: "Books",
  },
  {
    title: "JavaScript: The Definitive Guide",
    description:
      "Complete reference guide for modern JavaScript programming.",
    price: 55,
    stock: 35,
    image_url:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80",
    category: "Books",
  },
  {
    title: "Flutter Development Cookbook",
    description:
      "Learn how to build modern mobile applications using Flutter and Dart.",
    price: 60,
    stock: 30,
    image_url:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    category: "Books",
  },
  {
    title: "Database System Concepts",
    description:
      "Comprehensive introduction to database design, SQL and data management.",
    price: 70,
    stock: 25,
    image_url:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80",
    category: "Books",
  },
  {
    title: "Computer Networks",
    description:
      "Educational book explaining networking concepts and communication systems.",
    price: 65,
    stock: 40,
    image_url:
      "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=600&q=80",
    category: "Books",
  },
  {
    title: "Design Patterns",
    description:
      "Guide to reusable software design solutions and programming techniques.",
    price: 48,
    stock: 35,
    image_url:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80",
    category: "Books",
  },
  {
    title: "Artificial Intelligence Basics",
    description:
      "Introduction to AI concepts, machine learning and intelligent systems.",
    price: 75,
    stock: 20,
    image_url:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    category: "Books",
  },
  {
    title: "Cyber Security Fundamentals",
    description:
      "Learn security principles, threats and protection techniques.",
    price: 58,
    stock: 30,
    image_url:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80",
    category: "Books",
  },
  {
    title: "System Design Interview",
    description:
      "A practical guide for designing scalable software systems.",
    price: 65,
    stock: 25,
    image_url:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    category: "Books",
  },
];

const main = async () => {
  console.log("Seeding product...");

  for (const product of products) {

  const category = await prisma.category.findUnique({
    where:{
      name: product.category
    }
  });


  await prisma.product.create({
    data:{
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image_url: product.image_url,
      category_id: category.id
    }
  });

}
  console.log("Seeding completed!");
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });