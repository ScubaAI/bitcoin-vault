# 🏛️ Bitcoin Vault

> **3D Educational Visualization of the Bitcoin Blockchain**

An immersive, interactive 3D exploration of Bitcoin's Layer 1 - the most secure vault in the universe. Bitcoin Vault combines cutting-edge web technologies with real-time blockchain data to create an engaging educational experience.

![Bitcoin Vault](https://img.shields.io/badge/Bitcoin-Vault-orange?style=flat-square&logo=bitcoin)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-0.160-white?style=flat-square&logo=three.js)

---

## ✨ Features

### 🔐 **3D Vault Visualization**
- Immersive 3D environment built with Three.js and React Three Fiber
- Real-time Bitcoin block visualization with interactive elements
- Dynamic particle backgrounds and post-processing effects

### 🧱 **Blockchain Explorer**
- **Block Component** - Visualize individual Bitcoin blocks in 3D space
- **Transaction Flow** - Watch transactions propagate through the network
- **Merkle Tree** - Interactive visualization of transaction hashing
- **Network Map** - Global Bitcoin node topology visualization

### ⚡ **Lightning Network**
- Real-time Lightning Network channel visualization
- Node connectivity and channel capacity displays
- Lightning statistics integration

### 📊 **Real-Time Data**
- Live mempool monitoring with fee estimation
- Current block height and mining statistics
- Bitcoin halving countdown widget
- Real-time price and network metrics

### 🎓 **Educational Experience**
- **Interactive Tour Guide** - Step-by-step Bitcoin education
- **Knowledge Quizzes** - Test your understanding with interactive quizzes
- **Achievement System** - Earn badges as you learn
- Multi-language support (English/Spanish)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [Three.js](https://threejs.org/) | 3D graphics library |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | React renderer for Three.js |
| [React Three Drei](https://github.com/pmndrs/drei) | Useful helpers for R3F |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations and transitions |
| [SWR](https://swr.vercel.app/) | Data fetching and caching |
| [Axios](https://axios-http.com/) | HTTP client |

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/bitcoin-vault.git
cd bitcoin-vault

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

---

## 🚀 Development Commands

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

---

## 📁 Project Structure

```
bitcoin-vault/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Landing page
│   │   ├── layout.tsx         # Root layout with Inter font
│   │   ├── globals.css        # Global Tailwind styles
│   │   ├── [lang]/            # Internationalization routes
│   │   │   └── tour/
│   │   │       └── page.tsx   # Educational tour page
│   │   └── api/               # API routes
│   │       ├── blockchain/    # Blockchain data endpoints
│   │       ├── lightning/     # Lightning Network endpoints
│   │       └── mempool/       # Mempool data endpoints
│   │
│   ├── components/
│   │   ├── vault/             # 3D visualization components
│   │   │   ├── VaultScene.tsx      # Main 3D scene container
│   │   │   ├── Block.tsx           # 3D block visualization
│   │   │   ├── Transaction.tsx     # Transaction visualization
│   │   │   ├── MerkleTree.tsx      # Merkle tree 3D view
│   │   │   ├── LightningChannel.tsx # LN channel visualization
│   │   │   ├── NetworkMap.tsx      # Network topology
│   │   │   └── ParticleField.tsx   # Background particles
│   │   │
│   │   ├── ui/                # UI overlay components
│   │   │   ├── StatsOverlay.tsx    # Real-time stats display
│   │   │   ├── MempoolWidget.tsx   # Mempool information
│   │   │   ├── FeeEstimator.tsx    # Transaction fee estimator
│   │   │   ├── BlockDetails.tsx    # Block detail panel
│   │   │   └── CountdownWidget.tsx # Halving countdown
│   │   │
│   │   └── educational/       # Educational components
│   │       ├── TourGuide.tsx       # Interactive tour
│   │       ├── QuizOverlay.tsx     # Quiz interface
│   │       └── AchievementToast.tsx # Achievement notifications
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useBlockchainData.ts    # Blockchain data fetching
│   │   ├── useLightningStats.ts    # Lightning statistics
│   │   └── useMempool.ts           # Mempool monitoring
│   │
│   ├── lib/                   # Utilities and API clients
│   │   ├── three/
│   │   │   ├── animations.ts       # 3D animation utilities
│   │   │   ├── materials.ts        # Three.js materials
│   │   │   └── utils.ts            # 3D helper functions
│   │   └── api/
│   │       └── lightning.ts        # Lightning API client
│   │
│   └── types/                 # TypeScript definitions
│       └── vault.ts                # Core type definitions
│
├── public/                    # Static assets
│   ├── fonts/                 # 3D text fonts
│   └── textures/              # 3D textures
│
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript configuration
└── tailwind.config.ts        # Tailwind CSS configuration
```

---

## 🔌 API Endpoints

### Blockchain API
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/blockchain` | `GET` | Retrieve current blockchain data including block height, latest blocks, and network statistics |

### Lightning Network API
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/lightning` | `GET` | Fetch Lightning Network statistics, node count, and channel capacity |

### Mempool API
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/mempool` | `GET` | Get real-time mempool data including pending transactions, fee estimates, and congestion status |

---

## 🎯 Key Components

### [`VaultScene.tsx`](src/components/vault/VaultScene.tsx)
The main 3D scene orchestrator that brings together all visualization components. Manages camera positioning, lighting, and post-processing effects.

### [`Block.tsx`](src/components/vault/Block.tsx)
3D representation of Bitcoin blocks with interactive hover states, transaction counts, and block metadata visualization.

### [`MerkleTree.tsx`](src/components/vault/MerkleTree.tsx)
Interactive Merkle tree visualization showing how transactions are hashed and combined to form the block merkle root.

### [`TourGuide.tsx`](src/components/educational/TourGuide.tsx)
Step-by-step educational tour guiding users through Bitcoin concepts with interactive checkpoints and explanations.

### [`StatsOverlay.tsx`](src/components/ui/StatsOverlay.tsx)
Real-time overlay displaying current Bitcoin price, block height, hash rate, and other key network metrics.

---

## 🔗 External APIs

- **[Blockchain.com API](https://www.blockchain.com/api)** - Blockchain data and statistics
- **[Mempool.space API](https://mempool.space/docs/api)** - Mempool data and fee estimates
- **[1ML API](https://1ml.com/)** - Lightning Network statistics

---

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: API keys for enhanced rate limits
BLOCKCHAIN_API_KEY=your_key_here
MEMPOOL_API_KEY=your_key_here
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) community for the incredible 3D library
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) team for making 3D in React seamless
- Bitcoin developers and educators worldwide

---

<div align="center">

**[⬆ Back to Top](#-bitcoin-vault)**

Made with 🔶 by Bitcoin enthusiasts

</div>
