# Nero Stripe Mini

## Overview

**Nero Stripe Mini** is a lightweight, developer-centric decentralized payment interface built on the **NERO Chain**. Designed with Web3 authentication, Account Abstraction (AA), and gasless transactions, it streamlines user payments via stablecoin-like tokens on a virtual testnet.

> ⚡ Built using React + TypeScript, `Ethers.js`, `Web3Auth`, and `@account-abstraction/sdk`.

---

## Functional Specifications

- **Wallet Integration:** MetaMask + Google login via Web3Auth, with a fallback mock signer.
- **Gasless Payments:** Implemented via AA with mock smart contract routing.
- **ERC-20 Support:** Preconfigured for virtual tokens (e.g., USDC, DAI), extensible to live tokens.
- **Real-Time UI:** Uses React hooks and `Framer Motion` animations for state tracking and smooth UX.
- **Account Abstraction Ready:** Integrated with NERO’s testnet-compatible `SimpleAccountAPI`.

---

## Problem Statement

Traditional Web3 payments suffer from high friction (gas fees, wallet confusion, unclear transaction states). Nero Stripe Mini eliminates these challenges by leveraging **account abstraction**, **gasless design**, and a **streamlined UI** to enhance developer and user adoption on the NERO Chain.

---

## Installation

### Prerequisites

- **Node.js:** v18.x+
- **npm:** v8.x+
- **Browser:** Chrome/Firefox
- **Editor:** VS Code or modern IDE

### Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/Chidal/nero-stripe-mini.git
cd nero-stripe-mini

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Configure environment
# Edit `src/constants/config.ts` for RPC, contracts, Web3Auth clientId

# 4. Start development server
npm start

# 5. Build for production
npm run build
````

> 🔗 Dev server runs on: [http://localhost:3000](http://localhost:3000)


## Tech Stack

### Core Libraries

* **Frontend:** React\@18.3.1 + TypeScript\@4.9.5
* **Styling:** TailwindCSS\@3.4.1, Framer Motion\@10.12.4
* **Blockchain:** Ethers.js\@6.13.2, @account-abstraction/sdk\@0.5.0
* **Auth:** Web3Auth (modal/base/ethereum-provider)@7.2.0
* **Bundler:** @craco/craco\@7.1.0, react-scripts\@5.0.1

### Polyfills

For browser compatibility:

* `crypto-browserify`, `stream-http`, `https-browserify`, `process`, `buffer`, etc.

### Notifications

* `react-toastify@10.0.5`

---

## Webpack Configuration (via CRACO)

`craco.config.js` includes browser polyfills and custom Webpack tweaks:

```js
resolve: {
  fallback: {
    crypto: require.resolve('crypto-browserify'),
    process: require.resolve('process/browser'),
    buffer: require.resolve('buffer'),
    ...
  },
},
plugins: [
  new webpack.ProvidePlugin({
    Buffer: ['buffer', 'Buffer'],
    process: 'process/browser',
  }),
],
```

---

## Integration Details

### Web3Auth Setup (`WalletConnect.tsx`)

```ts
const signer = new ethers.Wallet('0x0123...abcdef') as any;
```

> 🔐 Replace with live `clientId` from [Web3Auth Dashboard](https://dashboard.web3auth.io)

---

### Account Abstraction (`aaUtils.ts`)

```ts
const walletAPI = new SimpleAccountAPI({
  provider,
  entryPointAddress: CONTRACT_ADDRESSES.entryPoint,
  owner: accountSigner,
  factoryAddress: CONTRACT_ADDRESSES.accountFactory,
});
```

---

### Payment Contract (Mocked)

```ts
const contract = new ethers.Contract('0xRealPaymentContractAddress', PAYMENT_ABI, signer);
const tx = await contract.sendPayment(recipient, ethers.parseUnits(amount, 18), selectedToken);
```

---

## Known Build & Runtime Issues

| Issue                                    | Cause                               | Fix                                |
| ---------------------------------------- | ----------------------------------- | ---------------------------------- |
| `TS2322` on `motion.div`                 | Framer Motion + TypeScript mismatch | Use `MotionProps & HTMLAttributes` |
| `ReferenceError: process is not defined` | Node polyfills missing              | Add `process/browser` via CRACO    |
| Peer dependency conflict                 | `react@18.3.1` vs. `@web3auth/ui`   | Use `--legacy-peer-deps`           |

---

## Build Process

* Init via: `npx create-react-app --template typescript`
* Webpack override via: `@craco/craco`
* Build: `craco build` → `build/`
* Source maps disabled for node\_modules

---

## Testing & Debugging

* **Unit Tests:** `npm test` (React Testing Library)
* **Runtime:** Mock signer, monitor browser console
* **Security Audit:** `npm audit fix --legacy-peer-deps`

---

## Future Integration Roadmap

* ✅ Virtual Testnet Demo
* 🔄 Live NERO RPC + Contracts
* 📱 React Native mobile app (Nov)
* 🌉 Multi-chain: BSC, Polygon support
* 🧠 AI Payment Insights via TensorFlow\.js

### Wave 2: Ecosystem 

* 🗳 Governance DApp + IPFS voting
* 🔌 REST API (Express.js)
* 🪟 AR QR Payments (Three.js)
* 🪙 Token Factory (ERC-20)
* 🧾 Campaign Module (multi-sig crowdfunding)

---

## Contributing

```bash
# Create a feature branch
git checkout -b feature/<your-feature>

# Commit your changes
git commit -m "feat: add <your-feature>"

# Push and create a PR
git push origin feature/<your-feature>
```

---

## License

Licensed under the MIT License.
See [`LICENSE.md`](LICENSE.md) for details.

---

## 📝 Deployment Checklist

* [ ] Update `[repository-url]`, `[your-email]`, `[deployment URL]`
* [ ] Add `LICENSE.md` (MIT license text)
* [ ] Include assets: `./assets/logo.png`, `./assets/display.png`
* [ ] Replace mock signer & contract with live credentials

---

*Nero Stripe Mini is built for developers, by developers — bridging traditional Web2 simplicity with Web3 payment security.*

``