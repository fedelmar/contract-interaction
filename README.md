# Ejemplos Simples de ethers.js

Este proyecto contiene ejemplos básicos para enseñar la interacción con contratos inteligentes usando ethers.js v6.

## 📁 Estructura Simple

```
├── package.json          # Dependencias básicas
├── tsconfig.json         # Configuración TypeScript
├── env.example           # Variables de entorno
├── src/
│   └── index.ts          # Todos los ejemplos en un archivo
└── README.md
```

## 🚀 Instalación Rápida

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables:**
```bash
cp env.example .env
# Edita .env con tus valores
```

3. **Ejecutar ejemplos:**
```bash
npm run dev
```

## 📝 Configuración (.env)

```env
# URL de la red (usa Sepolia para pruebas)
RPC_URL=https://sepolia.infura.io/v3/TU_INFURA_KEY

# Tu clave privada (NUNCA la compartas)
PRIVATE_KEY=0x1234567890abcdef...

# Dirección del contrato que quieres interactuar
CONTRACT_ADDRESS=0x...
```

## 🎯 Ejemplos Incluidos

### 1. **Conexión a la Red**
```typescript
const provider = new ethers.JsonRpcProvider(RPC_URL);
const blockNumber = await provider.getBlockNumber();
```

### 2. **Crear Wallet**
```typescript
const wallet = new ethers.Wallet(privateKey, provider);
```

### 3. **Interactuar con Contrato**
```typescript
// Definir ABI
const abi = ["function getContador() view returns (uint256)"];

// Crear contrato
const contrato = new ethers.Contract(address, abi, wallet);

// Llamar función
const resultado = await contrato.getContador();
```

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Compilar
npm run build

# Ejecutar compilado
npm start
```

## 📚 Conceptos Clave para Enseñar

1. **Provider**: Conexión a la red blockchain
2. **Wallet**: Cuenta con clave privada para firmar transacciones
3. **Contract**: Interfaz para interactuar con contratos inteligentes
4. **ABI**: Application Binary Interface - define las funciones del contrato
5. **Transacciones**: Operaciones que modifican el estado (cuestan gas)
6. **Llamadas**: Operaciones de solo lectura (gratis)

## ⚠️ Recordatorios Importantes

1. **NUNCA compartir la clave privada**
2. **Usar redes de prueba** (Sepolia, Goerli) para aprender
3. **El gas cuesta dinero real** en mainnet
4. **Siempre verificar direcciones** de contratos
5. **Probar primero con pequeñas cantidades**

## 🔗 Recursos Adicionales

- [Documentación ethers.js](https://docs.ethers.org/)
- [Faucet](https://cloud.google.com/application/web3/faucet) - ETH gratis para pruebas
- [Etherscan Sepolia](https://sepolia.etherscan.io/) - Explorador de bloques
