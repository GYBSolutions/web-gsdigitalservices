import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "swiftui-architecture-patterns-2024",
    title: "SwiftUI Architecture in 2024: What Actually Works at Scale",
    excerpt: "After building 3 production SwiftUI apps with 50K+ users each, here's what architecture patterns survived contact with reality — and what I'd avoid.",
    content: `After three years of building production SwiftUI applications, I have opinions.

The Swift community debates architecture constantly — MVVM, TCA, MV, VIPER — but most advice comes from people who haven't shipped apps at scale. This post covers what actually works when you have 80K daily active users and a team of 5 engineers.

## The Architecture I Use Today

I've settled on a Modified MVVM with Clean Architecture principles. Here's why:

**ViewModels are value types.** Using structs for ViewModels with @Observable (iOS 17+) gives you massive performance wins. No more fighting Combine, no more @Published soup.

**Feature packages via Swift Package Manager.** Every major feature lives in its own package. This gives you true isolation, faster compilation, and the ability to add engineers without them stepping on each other.

**Coordinator pattern — but simple.** I see teams implement Coordinators that are more complex than the screens they coordinate. Keep it simple: a Coordinator manages the navigation stack for a feature module, and nothing more.

## What I'd Avoid

**The Composable Architecture (TCA) for most apps.** It's a brilliant piece of engineering, but unless your team has TCA experience, the learning curve will slow you down significantly. The Redux-style boilerplate adds ceremony without proportional benefit for typical CRUD apps.

**SwiftData for complex data models.** SwiftData is fantastic for simple persistence, but if you have complex relationships, background sync, or conflict resolution needs, Core Data still wins. Don't let the API ergonomics fool you.

## Performance Patterns That Matter

The number one performance issue in SwiftUI apps is unnecessary re-renders. Three rules:

1. Extract frequently-updating views into their own components
2. Use @Observable over ObservableObject wherever iOS version allows
3. Profile with Xcode Instruments before optimizing — don't guess

## The Conclusion

Architecture debates miss the point. The best architecture is one your team understands and can execute consistently. Start with something simple, evolve it as you learn your domain, and document your decisions.`,
    publishedAt: "2024-09-15",
    readTime: 8,
    tags: ["SwiftUI", "Architecture", "iOS", "Swift", "MVVM"],
    category: "iOS Development",
    featured: true,
  },
  {
    id: "2",
    slug: "ai-first-mobile-development",
    title: "Building AI-First Mobile Apps: Lessons from the Field",
    excerpt: "On-device vs cloud inference, streaming UX patterns, and the architectural decisions that separate good AI features from great ones.",
    content: `AI features in mobile apps have gone from \"nice to have\" to table stakes. But most implementations feel like bolted-on afterthoughts. Here's how to build AI that feels native.

## On-Device vs Cloud Inference

The default assumption is always cloud inference — it's easy to ship fast. But on-device ML has advantages that compound over time:

- Zero latency for inference calls
- Offline capability
- No API costs at scale
- Privacy by design (huge for health, finance apps)

For classification tasks (transaction categorization, intent detection, content moderation), Core ML + Create ML is often the right answer. Apple Silicon makes on-device inference faster than you'd expect.

For generative tasks (summarization, chat, content generation), cloud is still king. But the architecture should treat cloud calls as potentially failing — design for graceful degradation from day one.

## Streaming UX

The single biggest UX improvement in AI-powered apps is streaming responses. Watching tokens appear feels alive in a way that loading spinners never do.

Implementation in iOS: use URLSession's bytes(from:) API to consume the SSE stream from your backend. Publish tokens to a @Published or @Observable property, let SwiftUI handle the rendering.

The key UX consideration: commit to content. Once streaming starts, don't delete what's been shown. Users track what they read; deletion is jarring. Use a buffering approach that only shows complete sentences.

## Architecture for AI Features

Treat AI capabilities as infrastructure-level concerns, not feature-level. Here's what that means in practice:

**AIService protocol.** Every AI interaction goes through a single protocol. This lets you swap providers, add caching, implement retry logic, and write tests without changing feature code.

**Response caching.** Identical prompts with identical context should return cached responses. Your users will notice the speed improvement; your API bill will thank you.

**Graceful degradation.** What happens when the AI call fails? What happens when it returns nonsense? Every AI feature needs a defined fallback behavior.`,
    publishedAt: "2024-08-22",
    readTime: 10,
    tags: ["AI", "iOS", "Core ML", "LLM", "Mobile"],
    category: "AI Development",
    featured: true,
  },
  {
    id: "3",
    slug: "startup-tech-stack-decisions",
    title: "Tech Stack Decisions That Will Haunt You (And What to Choose Instead)",
    excerpt: "The technology choices that seem clever at year one that cause catastrophic rewrites at year three — and the boring choices that scale.",
    content: `I've helped startups rescue projects that outgrew their foundations. The patterns are always the same. Here's how to avoid the most common traps.

## The Trap: Choosing For Today

The most common mistake is choosing a stack optimized for where you are, not where you'll be. This manifests as:

- A codebase that makes day-1 development fast but day-365 development slow
- A database schema that made sense for 1,000 users but falls apart at 100,000
- An API design that assumes a single client but needs to serve five

## What Actually Scales

**PostgreSQL for everything relational.** Every "we'll use a NoSQL database because it scales" decision I've seen has eventually been reversed. PostgreSQL with proper indexing handles more than most startups will ever throw at it. It has JSON support when you need schema flexibility.

**Boring infrastructure beats cutting-edge.** The infrastructure you understand and can debug at 2am is better than the infrastructure that's theoretically superior but requires specialized knowledge. Docker + AWS ECS over Kubernetes for teams under 20 engineers, every time.

**Monorepo, but modular.** Full microservices from day one is premature optimization. A modular monolith with clean boundaries evolves into microservices naturally when the team and scale justify it.

## The Decisions That Actually Matter

The stack matters less than you think. The decisions that actually determine if you'll need a rewrite are:

1. How clean is the boundary between your domain logic and your framework?
2. Can you add engineers without merge conflicts?
3. Is your data model correct?

Get those right and almost any stack will serve you.`,
    publishedAt: "2024-07-10",
    readTime: 7,
    tags: ["Architecture", "Startup", "Engineering", "Tech Stack"],
    category: "Product Engineering",
    featured: true,
  },
  {
    id: "4",
    slug: "ios-performance-optimization",
    title: "iOS Performance Optimization: A Systematic Approach",
    excerpt: "How to diagnose and fix the five most common performance problems in iOS apps, with real profiling data from production applications.",
    content: `Performance is a feature. In a competitive app market, a 200ms lag in your main interaction is the difference between keeping and losing a user. Here's how to approach it systematically.`,
    publishedAt: "2024-06-05",
    readTime: 12,
    tags: ["iOS", "Performance", "Instruments", "Swift", "Optimization"],
    category: "iOS Development",
    featured: false,
  },
  {
    id: "5",
    slug: "building-design-systems-that-scale",
    title: "Design Systems That Survive Engineering Growth",
    excerpt: "The anatomy of a design system that serves 5 engineers as well as 50 — and the mistakes that make most design systems fail.",
    content: `Most design systems fail not because of bad design, but because of bad engineering. Here's how to build one that lasts.`,
    publishedAt: "2024-05-20",
    readTime: 9,
    tags: ["Design System", "UI", "SwiftUI", "React", "Engineering"],
    category: "UI/UX Engineering",
    featured: false,
  },
  {
    id: "6",
    slug: "from-engineer-to-product-thinker",
    title: "The Engineer Who Thinks Like a Product Manager",
    excerpt: "Why the most valuable technical hires aren't the ones who write the best code — and how to develop product intuition as an engineer.",
    content: `The engineers who have the most impact aren't always the most technically sophisticated. They're the ones who deeply understand why they're building something — and that changes everything.`,
    publishedAt: "2024-04-12",
    readTime: 6,
    tags: ["Product", "Career", "Engineering", "Leadership"],
    category: "Product Engineering",
    featured: false,
  },
];

export const getFeaturedPosts = () => blogPosts.filter((p) => p.featured);
export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
export const getPostsByCategory = (category: string) =>
  blogPosts.filter((p) => p.category === category);
