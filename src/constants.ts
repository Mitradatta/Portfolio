import { NavLink, Education, Experience, Project, Skill, CodeSnippet, LearningItem, ExploringItem, BlogPost } from './types';

export const NAV_LINKS: NavLink[] = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'experience', title: 'Experience' },
    { id: 'projects', title: 'Projects' },
    { id: 'blog', title: 'Blog' },
    { id: 'skills', title: 'Skills' },
    { id: 'contact', title: 'Contact' },
];

export const PROFILE = `AI Engineer and Full-Stack Developer specializing in LLM systems, distributed inference, and AI-powered applications. Former AI Intern at Apple and Software Engineer at CompScale. Currently an AI Fellow at Handshake. MS CS @ UMass Amherst (GPA: 3.93).`;

export const TYPING_TEXTS = [
    "AI Engineer",
    "LLM Systems Engineer",
    "Full-Stack Developer",
    "ML Researcher",
    "Software Engineer"
];

export const ABOUT = `I'm someone who genuinely loves building systems that are fast, intelligent, and actually useful. My journey spans everything from scaling LLM inference pipelines at Apple to engineering AI compensation benchmarking tools at CompScale — and most recently, designing automated code evaluation frameworks at Handshake.

What excites me most is the intersection of ML and systems engineering: making AI work at scale, not just in notebooks. Whether it's reducing p99 latency from 60s to 5s with vLLM on A100 GPUs, or building a RAG pipeline that cuts costs by 84%, I care deeply about production-quality AI that ships and performs.

Outside of work, I'm at UMass Amherst completing my MS in CS (GPA: 3.93), where I've explored LLM unlearning, personalization, and advanced information retrieval. I believe the best engineers never stop being students — and there's always another paper, framework, or system to dig into.`;

export const CURRENTLY_EXPLORING: ExploringItem[] = [
    {
        title: "LLM Post-Training & Alignment",
        description: "Deep diving into RLHF, DPO, and instruction tuning. My LLM unlearning research with Gradient Ascent and DPO gave me hands-on experience with how models are shaped after pre-training.",
        icon: "brain",
        link: {
            text: "Reading: Direct Preference Optimization (DPO)",
            url: "https://arxiv.org/abs/2305.18290"
        }
    },
    {
        title: "Distributed LLM Inference at Scale",
        description: "Fascinated by vLLM, PagedAttention, speculative decoding, and KV-cache optimization. Built real experience at Apple scaling inference on A100 GPUs — always pushing to go further.",
        icon: "zap",
        link: {
            text: "Reading: vLLM: Efficient Memory Management for LLM Serving",
            url: "https://arxiv.org/abs/2309.06180"
        }
    },
    {
        title: "RAG & Information Retrieval",
        description: "Combining dense retrieval, vector databases, and LLM generation to build grounded AI systems. Hands-on experience with Pinecone and FLAN-T5 fine-tuning for personalized retrieval.",
        icon: "rocket",
        link: {
            text: "Course: UMass Information Retrieval",
            url: "https://ciir.cs.umass.edu/"
        }
    },
    {
        title: "AI Agents & Code Evaluation",
        description: "Exploring autonomous code review agents, LLM-powered test harnesses, and static analysis with AST parsing. My current work at Handshake sits right at this intersection.",
        icon: "atom",
        link: {
            text: "Reading: SWE-bench: Can LLMs Resolve GitHub Issues?",
            url: "https://arxiv.org/abs/2310.06770"
        }
    }
];

export const BLOG_POSTS: BlogPost[] = [
    {
        title: "LLM Unlearning: Making Models Forget Without Breaking Them",
        excerpt: "How Gradient Ascent and Direct Preference Optimization can remove specific knowledge from LLMs while preserving accuracy — lessons from fine-tuning Gemma-2b and Phi on GPU clusters.",
        date: "Mar 2025",
        readTime: "12 min read",
        tags: ["LLM Unlearning", "DPO", "PyTorch", "Privacy", "LoRA"],
        isTechnical: true,
        content: `Machine unlearning asks: can we make a model forget specific information without retraining from scratch? This matters for privacy (GDPR right to be forgotten), bias removal, and safety — but it's surprisingly hard to do without degrading the rest of the model.

Our research tackled this with two techniques: Gradient Ascent and Direct Preference Optimization (DPO). Gradient Ascent directly maximizes loss on the "forget set" — essentially doing the opposite of training on that data. DPO takes a softer approach, teaching the model to prefer forgetting-aligned outputs over the target knowledge.

We applied LoRA fine-tuning on Gemma-2b (2.7B parameters) and Phi (1.4B) on GPU clusters, which made the experiments tractable without full fine-tuning costs. LoRA updates only low-rank adapter matrices, so we could iterate quickly.

The key tension: the forget set and the retain set are not independent. Aggressive unlearning that successfully erases target knowledge often "bleeds" into related knowledge. We measured this carefully using ROUGE-L scores and downstream task accuracy.

Results: 86% model accuracy preserved (only 14% degradation), 10% bias reduction on targeted knowledge, ROUGE-L of 0.73 on retain tasks. The main lesson is that DPO is more stable than pure Gradient Ascent — it gives the model a direction to move toward, not just away from.`,
        formulas: [
            {
                name: "Gradient Ascent (Forget Step)",
                latex: "θ ← θ + η ∇_θ L_forget(θ)",
                description: "Maximize loss on forget set — the opposite of standard gradient descent."
            },
            {
                name: "DPO Objective",
                latex: "L_DPO = -E[log σ(β log π_θ(y_w|x)/π_ref(y_w|x) - β log π_θ(y_l|x)/π_ref(y_l|x))]",
                description: "Optimize policy to prefer retained knowledge (y_w) over forgotten knowledge (y_l)."
            },
            {
                name: "LoRA Decomposition",
                latex: "W = W_0 + ΔW = W_0 + BA, B ∈ R^{d×r}, A ∈ R^{r×k}",
                description: "Low-rank adaptation keeps r << min(d,k), drastically reducing trainable parameters."
            }
        ],
        diagrams: [],
        links: [
            { text: "DPO Paper (Rafailov et al.)", url: "https://arxiv.org/abs/2305.18290" },
            { text: "LoRA: Low-Rank Adaptation of LLMs", url: "https://arxiv.org/abs/2106.09685" },
            { text: "Machine Unlearning Survey", url: "https://arxiv.org/abs/2209.02299" }
        ]
    },
    {
        title: "Building RAG for LLM Personalization: FLAN-T5 and BERT Embeddings",
        excerpt: "How I built a retrieval-augmented generation pipeline that personalizes LLM outputs using user profiles and BERT-based semantic classification.",
        date: "Jan 2025",
        readTime: "9 min read",
        tags: ["RAG", "FLAN-T5", "BERT", "Personalization", "Information Retrieval"],
        isTechnical: true,
        content: `Generic LLM outputs are useful — but personalized outputs are transformative. My research explored how to make LLMs adapt their responses based on user profiles, combining fine-tuning with retrieval-augmented generation.

The core pipeline: given a user query and profile, retrieve the most relevant user-context documents from a vector store, prepend them as context, and fine-tune FLAN-T5 to generate responses that align with the user's preferences and history.

The fine-tuning step was critical. Without it, the model would often ignore retrieved context or blend it awkwardly with its pretrained knowledge. Instruction tuning FLAN-T5 on (query, user-profile, response) triples taught the model how to use personalized context effectively.

For output classification, we used BERT embeddings to map generated outputs into predefined semantic categories, verifying alignment with user intent. This gave us a quantitative measure of personalization quality: 86% alignment accuracy with minimal inference latency overhead.

Key lessons:
1. Fine-tuning the retrieval-augmented model (not just prompting it) dramatically improves context utilization.
2. BERT-based semantic classification is a lightweight, effective way to evaluate LLM output alignment.
3. User profile structure matters — flat profiles work worse than hierarchical representations of preferences.`,
        formulas: [
            {
                name: "RAG Retrieval",
                latex: "p(y|x) = Σ_z p(y|x,z) p(z|x)",
                description: "Generate y conditioned on both query x and retrieved context z."
            },
            {
                name: "BERT Cosine Similarity",
                latex: "sim(u, v) = (u · v) / (||u|| ||v||)",
                description: "Semantic similarity between BERT embeddings for alignment classification."
            }
        ],
        diagrams: [],
        links: [
            { text: "RAG Original Paper (Lewis et al.)", url: "https://arxiv.org/abs/2005.11401" },
            { text: "FLAN-T5 Paper", url: "https://arxiv.org/abs/2210.11416" },
            { text: "BERT: Pre-training of Deep Bidirectional Transformers", url: "https://arxiv.org/abs/1810.04805" }
        ]
    },
    {
        title: "LLM Unlearning: Making Models Forget",
        excerpt: "A non-technical introduction to why machine unlearning matters for AI privacy and safety, and the intuition behind the techniques we used in our research.",
        date: "Oct 2024",
        readTime: "6 min read",
        tags: ["LLM", "Privacy", "AI Safety", "Machine Learning"],
        content: `Imagine a language model trained on billions of web pages — including some that contain your personal information, private communications, or content you'd rather it never learned. Now you want it to forget. How do you make an AI unlearn something?

This isn't just hypothetical. GDPR gives EU citizens the "right to be forgotten," and AI companies need ways to honor this without retraining their entire model from scratch. Retraining GPT-4 just because one user wants their data removed would cost millions of dollars and weeks of compute.

Machine unlearning is the field trying to solve this. The intuition is simple: if training moves model weights in a direction that encodes certain knowledge, can we move them back?

Two main approaches:

**Gradient Ascent** treats unlearning as "anti-training." Instead of minimizing loss on the data you want to forget, you maximize it. The model actively becomes worse at predicting that data. It's blunt but fast.

**DPO (Direct Preference Optimization)** is more surgical. You give the model examples of what it should prefer (retained knowledge) vs. what it should deprioritize (forgotten knowledge). It learns a direction, not just away from something.

The hard part is collateral damage. Knowledge is entangled. Forgetting "private medical records in training data" might accidentally degrade the model's general healthcare knowledge. Measuring and controlling this tradeoff is the core research challenge.

Our work showed you can achieve meaningful unlearning while preserving 86% of model accuracy — but there's still a lot of room to improve.`,
        links: [
            { text: "Machine Unlearning Survey", url: "https://arxiv.org/abs/2209.02299" },
            { text: "GDPR Right to Erasure", url: "https://gdpr.eu/right-to-be-forgotten/" },
            { text: "DPO Paper", url: "https://arxiv.org/abs/2305.18290" }
        ]
    }
];

export const EDUCATION: Education[] = [
    {
        institution: 'University of Massachusetts Amherst',
        degree: 'Master of Science in Computer Science',
        period: 'Aug 2023 – May 2025',
        gpa: '3.93',
        courses: 'Advanced NLP, Neural Networks, Information Retrieval, Algorithms for Data Science'
    }
];

export const EXPERIENCE: Experience[] = [
    {
        role: 'Artificial Intelligence Fellow',
        company: 'Handshake',
        period: 'Oct 2025 – Present',
        points: [
            'Built automated code evaluation pipelines using Python and LLM-powered test harnesses, processing 1K+ agent code submissions and cutting review cycles by 30% compared to manual audits.',
            'Led systematic code reviews surfacing security vulnerabilities, data leakage patterns, and behavioral edge cases, achieving an 18% improvement in policy compliance across all reviewed submissions.',
            'Designed a comprehensive testing framework spanning 10 violation categories with automated quality gates, deployed across multiple repositories and preventing 40+ critical issues from reaching production.'
        ]
    },
    {
        role: 'AI Intern',
        company: 'Apple',
        period: 'Jan 2025 – May 2025',
        points: [
            'Scaled distributed LLM inference pipeline with vLLM on A100 GPUs, reducing p99 latency from 60s to 5s through batch optimization and KV-cache tuning, serving 4K+ daily entity resolution queries.',
            'Architected adaptive user query routing system with an ML classifier, reducing LLM costs by 84% and achieving +4% accuracy by routing between legacy models and GPT-4 based on query complexity over a 1M+ candidate database.',
            'Built production-grade TypeScript/Node.js microservice with Redis caching layer, health monitoring endpoints, and graceful degradation strategies, achieving 99.5% uptime for real-time entity linking requests.',
            'Implemented comprehensive observability and testing infrastructure including structured logging, Prometheus metrics, distributed tracing, and automated integration test suites with 84% coverage.'
        ]
    },
    {
        role: 'Software Engineer, AI',
        company: 'CompScale',
        period: 'May 2024 – Dec 2024',
        points: [
            'Engineered an AI-based compensation benchmarking feature matching customer pay data with external market surveys using RAG with Pinecone VectorDB, enhancing pricing consistency across 500+ job roles.',
            'Developed production REST APIs with FastAPI integrating OpenAI models for contextual job title normalization and compensation data extraction, implementing caching and fallback strategies to maintain 200ms P95 latency.',
            'Designed backend data models and persistence layers using PostgreSQL for structured compensation records and S3 for raw market survey ingests, enabling reliable historical analysis and reprocessing.',
            'Deployed containerized microservices on Kubernetes with horizontal pod autoscaling and load balancing, supporting concurrent enterprise workloads and achieving 2× higher throughput.'
        ]
    }
];

export const PROJECTS: Project[] = [
    {
        title: 'Telugu Handwritten Character Recognition',
        description: 'CNN-based system recognizing 52 Telugu handwritten characters with a custom dataset of 250+ samples per character collected from diverse age groups.',
        detailedDescription: 'End-to-end ML pipeline for Telugu script recognition using CNNs. Created a custom dataset by collecting handwritten samples from 250+ individuals aged 8–78, covering all 52 Telugu characters (16 vowels and 36 consonants). Built a preprocessing pipeline with image resizing, grayscale conversion, adaptive binarization, median filtering, and data augmentation. CNN architecture with batch normalization and dropout achieved strong classification accuracy.',
        learnings: [
            'Building custom ML datasets from scratch — collection, preprocessing, and augmentation.',
            'CNN architecture design and regularization for small, high-dimensional image datasets.',
            'OpenCV preprocessing pipeline: binarization, noise filtering, and normalization.',
            'Handling class imbalance with weighted losses for visually similar character classes.'
        ],
        repoUrl: 'https://github.com/Mitradatta/Telugu-Character-Recognition',
        imageSeed: 'TeluguCharacterRecognition',
        image: '/Telugu_Pipeline_pro_preview.png',
        tags: ['Python', 'TensorFlow', 'Keras', 'CNN', 'OpenCV', 'Computer Vision', 'Deep Learning', 'Inkscape']
    },
    {
        title: 'ARTER Framework · Apple AI Research',
        description: 'Architecture diagram for ARTER (Adaptive Retrieval & Transformation for Entity Resolution), an Apple AI research framework for production-scale entity linking — designed with Inkscape.',
        detailedDescription: 'Created during my internship at Apple, ARTER is a production-oriented AI framework for adaptive retrieval and entity resolution at scale. The architecture diagram — built entirely in Inkscape — visualizes the full data pipeline: query routing, retrieval stages, transformation modules, and entity linking outputs. The framework was the backbone of the entity resolution system serving 4K+ daily queries on a 1M+ candidate database. Multiple diagram versions were iterated to communicate system boundaries and data flows clearly for cross-functional teams.',
        learnings: [
            'Designing AI system architectures for production entity resolution at Apple scale.',
            'Professional technical diagramming with Inkscape for cross-functional communication.',
            'Iterative visual design — refining layout and information hierarchy across versions.',
            'Automating SVG diagram generation with Python for reproducibility and version control.'
        ],
        repoUrl: 'https://machinelearning.apple.com/research/leveraging-power',
        imageSeed: 'ARTERFramework',
        image: '/ARTER_Framework_v2_preview.png',
        tags: ['Inkscape', 'SVG', 'Apple', 'System Design', 'Entity Resolution', 'AI Architecture', 'Python']
    },
    {
        title: 'Briefly – AI Powered Summarization',
        description: 'AI-powered summarization system using FastAPI and Mistral AI handling 500K+ tokens/min, with access control, feedback-driven regeneration, and 91% backend test coverage.',
        detailedDescription: 'Developed an AI-powered document and code summarization platform built on FastAPI and Mistral AI with context-aware prompt engineering. The system handles up to 500K+ tokens per minute, enabling efficient summarization of large documents and extensive code modules. Features include access control for secure authentication, summary sharing for seamless collaboration, and feedback-driven regeneration for adaptive improvements. Achieved 91% backend test coverage with Pytest, with a React/Node.js frontend and MongoDB for persistence.',
        learnings: [
            'Scaling LLM inference throughput with FastAPI async endpoints and Mistral AI.',
            'Designing feedback loops for iterative LLM output improvement.',
            'Building reliable test coverage (91%) for AI-powered backend services with Pytest.',
            'Full-stack integration: React frontend, Node.js BFF, FastAPI ML backend, MongoDB.'
        ],
        repoUrl: 'https://github.com/Mitradatta',
        imageSeed: 'BrieflyAISummarization',
        tags: ['React', 'FastAPI', 'Node.js', 'MongoDB', 'Mistral AI', 'Prompt Engineering', 'Python']
    },
    {
        title: 'Effective Unlearning in LLMs',
        description: 'Research project applying Gradient Ascent and DPO to unlearn targeted knowledge from Gemma-2b and Phi models via LoRA fine-tuning, achieving 86% accuracy retention and 10% bias reduction.',
        detailedDescription: 'Research into machine unlearning techniques for LLMs to enhance user privacy and reduce model bias. Implemented Gradient Ascent (maximizing loss on the forget set) and Direct Preference Optimization (DPO) to remove targeted knowledge while preserving model utility. Applied LoRA fine-tuning on Gemma-2b (2.7B parameters) and Phi (1.4B) on GPU clusters for compute efficiency. Achieved 86% model accuracy retention, 10% bias reduction on targeted knowledge, and a ROUGE-L score of 0.73 on retain tasks.',
        learnings: [
            'Gradient Ascent and DPO as complementary unlearning strategies.',
            'LoRA fine-tuning for efficient large-scale model adaptation on GPU clusters.',
            'Balancing forget-set degradation with retain-set preservation.',
            'Evaluating unlearning quality with ROUGE-L and downstream task accuracy.'
        ],
        repoUrl: 'https://github.com/Mitradatta',
        imageSeed: 'LLMUnlearning',
        tags: ['PyTorch', 'LoRA', 'DPO', 'LLM Unlearning', 'Gemma-2b', 'Phi', 'NLP', 'Instruction Tuning']
    },
    {
        title: 'Personalization of Large Language Models',
        description: 'RAG pipeline fine-tuning FLAN-T5 with user profiles for personalized LLM outputs, using BERT embeddings for semantic classification at 86% alignment accuracy.',
        detailedDescription: 'Built a personalized LLM system combining retrieval-augmented generation with instruction fine-tuning. A RAG pipeline retrieves user-profile-relevant context from a vector store and feeds it to a fine-tuned FLAN-T5 model, enabling personalized response generation. BERT embeddings classify generated outputs into semantic categories to measure alignment with user intent, achieving 86% alignment accuracy with minimal inference latency overhead.',
        learnings: [
            'RAG pipeline design for personalized LLM output generation.',
            'Instruction fine-tuning FLAN-T5 to leverage retrieved context effectively.',
            'BERT embedding-based semantic classification for LLM output evaluation.',
            'Balancing personalization quality against inference latency.'
        ],
        repoUrl: 'https://github.com/Mitradatta',
        imageSeed: 'LLMPersonalization',
        tags: ['Python', 'RAG', 'FLAN-T5', 'BERT', 'Information Retrieval', 'ML', 'Personalization']
    },
    {
        title: 'Sorting Algorithm Visualizer',
        description: 'Interactive web tool visualizing Bubble, Selection, Insertion, Merge, and Quick Sort in real-time with step-by-step animation controls.',
        detailedDescription: 'Browser-based sorting visualizer using vanilla HTML, CSS, and JavaScript with Bootstrap 5. Decoupled sorting algorithms from the visualization layer by recording all operations into animation queues, then replaying them with configurable speed. Each algorithm required a custom animation model — Merge Sort\'s multi-level merging and Quick Sort\'s partition tracking each had distinct implementations.',
        learnings: [
            'Decoupling algorithm logic from visualization for step-by-step replay.',
            'JavaScript async/await and setTimeout for smooth, controllable animations.',
            'Building intuitive educational tools with good UI/UX.',
            'Deep algorithmic understanding achieved through visual implementation.'
        ],
        repoUrl: 'https://github.com/Mitradatta/Sorting-Visualizer',
        imageSeed: 'SortingVisualizer',
        tags: ['JavaScript', 'HTML/CSS', 'Bootstrap 5', 'Algorithms', 'Data Structures', 'Web Development']
    },
    {
        title: 'TicTacToe AI (Minimax)',
        description: 'Java Swing game with an unbeatable AI opponent powered by the Minimax algorithm with alpha-beta pruning.',
        detailedDescription: 'Fully functional Tic-Tac-Toe game in Java with a graphical interface built using Java Swing/AWT. The AI opponent uses the Minimax algorithm to evaluate all possible future game states and select the optimal move. Alpha-beta pruning eliminates irrelevant branches, making the AI provably unbeatable — it either wins or forces a draw.',
        learnings: [
            'Implementing the Minimax algorithm for adversarial game tree search.',
            'Alpha-beta pruning to optimize recursive search performance.',
            'Building interactive GUIs with Java Swing and AWT.',
            'Game state representation and win condition detection.'
        ],
        repoUrl: 'https://github.com/Mitradatta/TicTacToeGame-AI',
        imageSeed: 'TicTacToeAI',
        tags: ['Java', 'Java Swing', 'AI', 'Minimax Algorithm', 'Game Development', 'Algorithms']
    },
    {
        title: 'ARTER Framework Architecture',
        description: 'End-to-end architecture diagram of the ARTER (Adaptive Retrieval & Transformation for Entity Resolution) framework, designed and illustrated with Inkscape SVG tooling.',
        detailedDescription: 'A detailed system architecture visualization of the ARTER framework — designed to illustrate adaptive retrieval and entity resolution pipelines. Created entirely in Inkscape using structured SVG layers, custom vector shapes, and a consistent design language. The diagram communicates data flow, module boundaries, and transformation stages in a production-oriented AI system. Multiple versions were iterated (v1 → pro) to refine clarity and visual hierarchy.',
        learnings: [
            'Professional technical diagramming with Inkscape and structured SVG workflows.',
            'Communicating complex AI/ML system architectures visually for technical audiences.',
            'Iterative design — refining layout, typography, and color hierarchy across versions.',
            'Automating diagram generation with Python SVG scripting for reproducibility.'
        ],
        repoUrl: 'https://github.com/Mitradatta',
        imageSeed: 'ARTERFramework',
        image: '/ARTER_Framework_pro_preview.png',
        tags: ['Inkscape', 'SVG', 'System Design', 'Technical Diagramming', 'Python', 'AI Architecture']
    }
];

export const SKILLS: Skill[] = [
    { category: 'Languages', list: ['Python', 'Java', 'C/C++', 'JavaScript', 'TypeScript', 'Golang', 'SQL', 'Shell Scripting'] },
    { category: 'ML & AI', list: ['PyTorch', 'LangChain', 'TensorFlow', 'Ray', 'Scikit-learn', 'Hugging Face', 'OpenAI API', 'vLLM', 'LoRA', 'BERT', 'FLAN-T5'] },
    { category: 'Web & Backend', list: ['React.js', 'Node.js', 'FastAPI', 'Flask', 'Django', 'Apache Kafka', 'REST APIs', 'Redis', 'MongoDB', 'PostgreSQL', 'MySQL'] },
    { category: 'Cloud & DevOps', list: ['AWS', 'GCP', 'Kubernetes', 'Docker', 'Git', 'GitHub Actions', 'Prometheus', 'Unix/Linux'] },
    { category: 'Design & Visualization', list: ['Inkscape', 'SVG', 'GIMP', 'Blender', 'Technical Diagramming', 'Figma'] }
];

export const CODE_SNIPPETS: CodeSnippet[] = [
    {
        language: 'Python',
        title: 'LLM Unlearning with Gradient Ascent + DPO',
        code:
`import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import get_peft_model, LoraConfig

# Load model with LoRA adapters
model = AutoModelForCausalLM.from_pretrained("google/gemma-2b")
config = LoraConfig(r=16, lora_alpha=32, target_modules=["q_proj", "v_proj"])
model = get_peft_model(model, config)

def gradient_ascent_step(model, forget_batch, optimizer):
    """Maximize loss on forget set — anti-training."""
    outputs = model(**forget_batch)
    loss = -outputs.loss  # Flip the sign!
    loss.backward()
    optimizer.step()
    optimizer.zero_grad()
    return loss.item()

def dpo_unlearn_step(model, ref_model, batch, beta=0.1):
    """DPO: prefer retained knowledge over forgotten."""
    chosen, rejected = batch["chosen"], batch["rejected"]

    log_pi_chosen = model(**chosen).logits.log_softmax(-1)
    log_pi_ref_chosen = ref_model(**chosen).logits.log_softmax(-1)
    log_pi_rejected = model(**rejected).logits.log_softmax(-1)
    log_pi_ref_rejected = ref_model(**rejected).logits.log_softmax(-1)

    ratio_w = beta * (log_pi_chosen - log_pi_ref_chosen).sum(-1)
    ratio_l = beta * (log_pi_rejected - log_pi_ref_rejected).sum(-1)
    return -torch.log(torch.sigmoid(ratio_w - ratio_l)).mean()`
    },
    {
        language: 'TypeScript',
        title: 'vLLM-Backed Entity Resolution Service (Apple-style)',
        code:
`import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);

interface EntityQuery {
  query: string;
  complexity: 'simple' | 'complex';
}

async function routeQuery(query: string): Promise<EntityQuery> {
  // ML classifier determines query complexity
  const complexity = await classifyComplexity(query);
  return { query, complexity };
}

async function resolveEntity(rawQuery: string): Promise<string> {
  const cacheKey = \`entity:\${hash(rawQuery)}\`;

  // Check Redis cache first
  const cached = await redis.get(cacheKey);
  if (cached) return cached;

  // Route to appropriate model based on complexity
  const { query, complexity } = await routeQuery(rawQuery);
  const model = complexity === 'simple'
    ? 'gpt-3.5-turbo'   // 84% cheaper
    : 'gpt-4';          // +4% accuracy on hard cases

  const result = await callVLLM({ model, query });

  // Cache result for 1 hour
  await redis.setex(cacheKey, 3600, result);
  return result;
}

// Graceful degradation on failure
async function callWithFallback(query: string): Promise<string> {
  try {
    return await resolveEntity(query);
  } catch {
    return await legacyResolver(query);
  }
}`
    }
];

export const WHAT_IM_LEARNING: LearningItem[] = [
    {
        title: "LLM Post-Training & Alignment",
        description: "RLHF, DPO, and instruction tuning — building on my LLM unlearning research to understand how models are shaped after pre-training."
    },
    {
        title: "Distributed Inference at Scale",
        description: "vLLM, PagedAttention, speculative decoding, and KV-cache optimization — extending what I built at Apple to stay at the frontier."
    },
    {
        title: "AI Agents & Code Evaluation",
        description: "Autonomous code review agents, LLM-powered test harnesses, and AST-based static analysis — core to my current work at Handshake."
    }
];

export const STATS = [
    { label: 'LLM Latency Reduction', value: 12, suffix: '×' },
    { label: 'LLM Cost Reduction (Apple)', value: 84, suffix: '%' },
    { label: 'Agent Code Reviews', value: 1000, suffix: '+' },
    { label: 'GPA @ UMass Amherst', value: 3.93, suffix: '' }
];

export const CONTACT_INFO = {
    email: 'gmitradatta2001@gmail.com',
    linkedin: 'https://www.linkedin.com/in/mitradatta',
    github: 'https://github.com/Mitradatta',
    phone: '413-466-0630',
    location: 'Amherst, Massachusetts'
};

export const TECH_STACK = {
    frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    tools: ['Vite', 'TensorFlow.js'],
    deployment: ['GitHub Pages', 'Vercel']
};

export const PORTFOLIO_CONTEXT = `
Mitra Datta Ganapaneni's Profile: ${PROFILE}
About Mitra: ${ABOUT}
Education: ${JSON.stringify(EDUCATION)}
Work Experience: ${JSON.stringify(EXPERIENCE)}
Projects: ${JSON.stringify(PROJECTS.map(p => ({title: p.title, description: p.description})))}
Technical Skills: ${JSON.stringify(SKILLS)}
Contact: Email: gmitradatta2001@gmail.com, Phone: 413-466-0630, LinkedIn: linkedin.com/in/mitradatta, GitHub: github.com/Mitradatta
`;
