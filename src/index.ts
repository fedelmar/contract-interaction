import { ethers } from "ethers";
import { config } from "dotenv";

// Cargar variables de entorno
config();

/**
 * EJEMPLO 1: Conexión básica a la red Ethereum
 */
async function connectToNetwork() {
  console.log("🔗 Conectando a la red Ethereum...");

  // Crear proveedor (conexión a la red)
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

  // Verificar conexión
  const blockNumber = await provider.getBlockNumber();
  console.log(`✅ Conectado! Bloque actual: ${blockNumber}`);

  return provider;
}

/**
 * EJEMPLO 2: Crear una wallet
 */
function createWallet(privateKey: string, provider: ethers.JsonRpcProvider) {
  console.log("👛 Creando wallet...");

  // Crear wallet desde clave privada
  const wallet = new ethers.Wallet(privateKey, provider);

  console.log(`✅ Wallet creada! Dirección: ${wallet.address}`);
  return wallet;
}

/**
 * EJEMPLO 3: Interactuar con un contrato simple
 */
async function contractInteract() {
  console.log("\n📋 === INTERACCIÓN CON CONTRATO ===");

  // 1. Conectar a la red
  const provider = await connectToNetwork();

  // 2. Crear wallet
  const wallet = createWallet(process.env.PRIVATE_KEY!, provider);

  // 3. Definir ABI del contrato (interfaz)
  const contractABI = [
    {
      inputs: [],
      name: "increment",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "number",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "newNumber", type: "uint256" }],
      name: "setNumber",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  // 4. Crear instancia del contrato
  const contractAddress = process.env.CONTRACT_ADDRESS!;
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  console.log(`📄 Contrato conectado: ${contractAddress}`);

  try {
    // 5. Llamar función de solo lectura
    console.log("\n📖 Leyendo datos del contrato...");
    const currentNumber = await contract.number();
    console.log(`📊 Número actual: ${currentNumber.toString()}`);

    // 6. Enviar transacción
    console.log("\n✍️ Enviando transacción...");
    const tx = await contract.increment();
    console.log(`⏳ Transacción enviada: ${tx.hash}`);

    // 7. Esperar confirmación
    console.log("⏳ Esperando confirmación...");
    const receipt = await tx.wait();
    console.log(`✅ Transacción confirmada en bloque: ${receipt.blockNumber}`);

    // 8. Verificar el nuevo valor
    const updatedNumber = await contract.number();
    console.log(`📊 Nuevo número: ${updatedNumber.toString()}`);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// Ejecutar ejemplos
async function main() {
  console.log("🚀 === EJEMPLOS DE ETHERS.JS ===\n");

  // Verificar configuración
  if (
    !process.env.RPC_URL ||
    !process.env.PRIVATE_KEY ||
    !process.env.CONTRACT_ADDRESS
  ) {
    console.error("❌ Configura las variables en el archivo .env");
    console.log("📝 Copia env.example a .env y configura tus valores");
    return;
  }

  try {
    await contractInteract();
  } catch (error) {
    console.error("❌ Error general:", error);
  }
}

// Ejecutar solo si se llama directamente
if (require.main === module) {
  main();
}
