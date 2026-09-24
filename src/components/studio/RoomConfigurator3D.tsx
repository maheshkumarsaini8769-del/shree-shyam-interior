import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Sparkles,
  Sun,
  Layers,
  ShoppingBag,
  Sliders,
  Check,
  Calendar,
  FileDown,
  ChevronDown,
  ChevronUp,
  Info,
  Maximize2,
  ShieldCheck
} from 'lucide-react';
import {
  ConfiguratorSelections,
  calculateTurnkeyCost,
  WALL_FINISHES,
  CABINET_FINISHES,
  FLOORING_FINISHES,
  LIGHTING_MOODS,
  HARDWARE_PACKAGES,
  syncConfiguratorFromBackend
} from '../../services/pricingEstimatorService';
import { useQuote } from '../../context/QuoteContext';
import { useToast } from '../../context/ToastContext';
import productsData from '../../data/products.json';
import { Product } from '../../types/product';
import { Link } from 'react-router-dom';

export const RoomConfigurator3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { addItem } = useQuote();
  const { showToast } = useToast();
  const [, setConfigVersion] = useState(0);

  useEffect(() => {
    syncConfiguratorFromBackend().then(() => {
      setConfigVersion((v) => v + 1);
    });
  }, []);

  const [selections, setSelections] = useState<ConfiguratorSelections>({
    roomType: 'living',
    wallFinish: 'fluted-teak',
    cabinetFinish: 'acrylic-white',
    flooring: 'vitrified-mirror',
    lightingMood: 'warm-3000k',
    hardwarePackage: 'hafele-premium'
  });

  const [showItemized, setShowItemized] = useState<boolean>(true);
  const [activeTabSection, setActiveTabSection] = useState<'wall' | 'cabinet' | 'floor' | 'lighting' | 'hardware'>('wall');

  // Three.js scene refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Dynamic mesh and light refs
  const wallMeshRef = useRef<THREE.Mesh | null>(null);
  const louversGroupRef = useRef<THREE.Group | null>(null);
  const floorMeshRef = useRef<THREE.Mesh | null>(null);
  const credenzaMeshRef = useRef<THREE.Mesh | null>(null);
  const coveLightRef = useRef<THREE.PointLight | null>(null);
  const coveStripMeshRef = useRef<THREE.Mesh | null>(null);
  const spotLightRef = useRef<THREE.SpotLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);

  // Room template groups
  const livingGroupRef = useRef<THREE.Group | null>(null);
  const bedroomGroupRef = useRef<THREE.Group | null>(null);
  const kitchenGroupRef = useRef<THREE.Group | null>(null);
  const bathroomGroupRef = useRef<THREE.Group | null>(null);
  const officeGroupRef = useRef<THREE.Group | null>(null);
  const cabinetMeshesRef = useRef<THREE.Mesh[]>([]);

  // Camera Orbit State
  const orbitState = useRef({
    isDragging: false,
    prevX: 0,
    prevY: 0,
    theta: Math.PI / 4, // Horizontal angle
    phi: Math.PI / 3.2, // Vertical angle
    radius: 6.8,        // Distance from center
    target: new THREE.Vector3(0, 1.2, 0)
  });

  const pricing = calculateTurnkeyCost(selections);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 460;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x13171b);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    cameraRef.current = camera;
    updateCameraPosition();

    // 3. Renderer with soft shadows
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lights
    // Ambient fill
    const ambient = new THREE.AmbientLight(0xfff5ea, 0.85);
    scene.add(ambient);
    ambientLightRef.current = ambient;

    // False Ceiling Cove Warm PointLight
    const coveLight = new THREE.PointLight(0xffaa44, 2.2, 12);
    coveLight.position.set(0, 2.9, 0);
    coveLight.castShadow = true;
    coveLight.shadow.bias = -0.001;
    scene.add(coveLight);
    coveLightRef.current = coveLight;

    // Architectural Key Spotlight
    const spot = new THREE.SpotLight(0xffffff, 2.4, 15, Math.PI / 4, 0.3, 1);
    spot.position.set(2, 3.2, 2.5);
    spot.target.position.set(0, 1, -1);
    spot.castShadow = true;
    spot.shadow.mapSize.width = 1024;
    spot.shadow.mapSize.height = 1024;
    scene.add(spot);
    scene.add(spot.target);
    spotLightRef.current = spot;

    // 5. Room Structure Geometries & Meshes
    // A. FLOOR
    const floorGeo = new THREE.PlaneGeometry(7, 7);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xe2dfd8,
      roughness: 0.15,
      metalness: 0.05
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    floorMeshRef.current = floor;

    // B. CEILING with Recessed False Ceiling Glow Strip
    const ceilingGeo = new THREE.PlaneGeometry(7, 7);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0x1f2429,
      roughness: 0.9
    });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.position.y = 3.2;
    ceiling.rotation.x = Math.PI / 2;
    scene.add(ceiling);

    // Cove LED light strip border
    const coveStripGeo = new THREE.RingGeometry(1.8, 2.05, 32);
    const coveStripMat = new THREE.MeshBasicMaterial({
      color: 0xffaa44,
      side: THREE.DoubleSide
    });
    const coveStrip = new THREE.Mesh(coveStripGeo, coveStripMat);
    coveStrip.position.set(0, 3.16, 0);
    coveStrip.rotation.x = Math.PI / 2;
    scene.add(coveStrip);
    coveStripMeshRef.current = coveStrip;

    // C. BACK WALL (Focal Accent Wall)
    const backWallGeo = new THREE.PlaneGeometry(7, 3.2);
    const backWallMat = new THREE.MeshStandardMaterial({
      color: 0x8c5831,
      roughness: 0.6,
      metalness: 0.1
    });
    const backWall = new THREE.Mesh(backWallGeo, backWallMat);
    backWall.position.set(0, 1.6, -3.5);
    backWall.receiveShadow = true;
    scene.add(backWall);
    wallMeshRef.current = backWall;

    // Louvers Group (Procedural vertical 3D teak slats)
    const louversGroup = new THREE.Group();
    const slatGeo = new THREE.BoxGeometry(0.045, 3.16, 0.04);
    const slatMat = new THREE.MeshStandardMaterial({
      color: 0x8c5831,
      roughness: 0.5,
      metalness: 0.08
    });
    for (let x = -3.2; x <= 3.2; x += 0.12) {
      const slat = new THREE.Mesh(slatGeo, slatMat);
      slat.position.set(x, 1.6, -3.47);
      slat.castShadow = true;
      slat.receiveShadow = true;
      louversGroup.add(slat);
    }
    scene.add(louversGroup);
    louversGroupRef.current = louversGroup;

    // D. LEFT WALL
    const leftWallGeo = new THREE.PlaneGeometry(7, 3.2);
    const leftWallMat = new THREE.MeshStandardMaterial({
      color: 0x272c32,
      roughness: 0.85
    });
    const leftWall = new THREE.Mesh(leftWallGeo, leftWallMat);
    leftWall.position.set(-3.5, 1.6, 0);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    cabinetMeshesRef.current = [];

    // ==========================================
    // ROOM TEMPLATE 1: LIVING ROOM LOUNGE GROUP
    // ==========================================
    const livingGroup = new THREE.Group();

    // Living Credenza (Cabinetry)
    const credenzaGeo = new THREE.BoxGeometry(3.6, 0.45, 0.55);
    const credenzaMat = new THREE.MeshStandardMaterial({
      color: 0xfafafa,
      roughness: 0.12,
      metalness: 0.15
    });
    const credenza = new THREE.Mesh(credenzaGeo, credenzaMat);
    credenza.position.set(0, 0.5, -3.15);
    credenza.castShadow = true;
    credenza.receiveShadow = true;
    livingGroup.add(credenza);
    credenzaMeshRef.current = credenza;
    cabinetMeshesRef.current.push(credenza);

    // Under-credenza warm LED glow strip
    const underLightGeo = new THREE.PlaneGeometry(3.4, 0.04);
    const underLightMat = new THREE.MeshBasicMaterial({ color: 0xffaa44 });
    const underLight = new THREE.Mesh(underLightGeo, underLightMat);
    underLight.position.set(0, 0.28, -3.1);
    livingGroup.add(underLight);

    // Ultra-Slim 65" TV Screen
    const tvFrameGeo = new THREE.BoxGeometry(2.4, 1.35, 0.04);
    const tvFrameMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.3 });
    const tv = new THREE.Mesh(tvFrameGeo, tvFrameMat);
    tv.position.set(0, 1.75, -3.42);
    tv.castShadow = true;
    livingGroup.add(tv);

    const tvScreenGeo = new THREE.PlaneGeometry(2.32, 1.27);
    const tvScreenMat = new THREE.MeshBasicMaterial({ color: 0x1a2830 });
    const tvScreen = new THREE.Mesh(tvScreenGeo, tvScreenMat);
    tvScreen.position.set(0, 1.75, -3.39);
    livingGroup.add(tvScreen);

    // Sectional Sofa
    const sofaGroup = new THREE.Group();
    const sofaBaseGeo = new THREE.BoxGeometry(3.2, 0.35, 1.4);
    const fabricMat = new THREE.MeshStandardMaterial({ color: 0x2e353b, roughness: 0.9 });
    const sofaBase = new THREE.Mesh(sofaBaseGeo, fabricMat);
    sofaBase.position.set(0, 0.22, 1.0);
    sofaBase.castShadow = true;
    sofaBase.receiveShadow = true;
    sofaGroup.add(sofaBase);

    const backrestGeo = new THREE.BoxGeometry(3.2, 0.65, 0.35);
    const backrest = new THREE.Mesh(backrestGeo, fabricMat);
    backrest.position.set(0, 0.65, 1.55);
    backrest.castShadow = true;
    sofaGroup.add(backrest);

    const cushionGeo = new THREE.BoxGeometry(1.4, 0.22, 1.05);
    const cushionMat = new THREE.MeshStandardMaterial({ color: 0xc49b71, roughness: 0.85 });
    const cushion1 = new THREE.Mesh(cushionGeo, cushionMat);
    cushion1.position.set(-0.75, 0.44, 0.95);
    cushion1.castShadow = true;
    sofaGroup.add(cushion1);

    const cushion2 = new THREE.Mesh(cushionGeo, cushionMat);
    cushion2.position.set(0.75, 0.44, 0.95);
    cushion2.castShadow = true;
    sofaGroup.add(cushion2);

    livingGroup.add(sofaGroup);

    // Round Luxury Coffee Table
    const tableTopGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.05, 32);
    const tableTopMat = new THREE.MeshStandardMaterial({ color: 0xedeef2, roughness: 0.1, metalness: 0.2 });
    const tableTop = new THREE.Mesh(tableTopGeo, tableTopMat);
    tableTop.position.set(0, 0.42, -0.6);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    livingGroup.add(tableTop);

    const tableLegGeo = new THREE.CylinderGeometry(0.18, 0.32, 0.4, 24);
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xb58038, roughness: 0.3, metalness: 0.8 });
    const tableLeg = new THREE.Mesh(tableLegGeo, brassMat);
    tableLeg.position.set(0, 0.2, -0.6);
    tableLeg.castShadow = true;
    livingGroup.add(tableLeg);

    // Indoor Planter Pot
    const potGeo = new THREE.CylinderGeometry(0.28, 0.2, 0.55, 20);
    const potMat = new THREE.MeshStandardMaterial({ color: 0x1f2226, roughness: 0.8 });
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.set(2.4, 0.28, -3.0);
    pot.castShadow = true;
    livingGroup.add(pot);

    scene.add(livingGroup);
    livingGroupRef.current = livingGroup;
    livingGroup.visible = selections.roomType === 'living';

    // ==========================================
    // ROOM TEMPLATE 2: MASTER SUITE BEDROOM GROUP
    // ==========================================
    const bedroomGroup = new THREE.Group();

    // Bed Platform Base
    const bedBaseGeo = new THREE.BoxGeometry(2.4, 0.35, 2.5);
    const woodBedMat = new THREE.MeshStandardMaterial({ color: 0x3d2b1f, roughness: 0.6 });
    const bedBase = new THREE.Mesh(bedBaseGeo, woodBedMat);
    bedBase.position.set(0, 0.18, 0.4);
    bedBase.castShadow = true;
    bedBase.receiveShadow = true;
    bedroomGroup.add(bedBase);

    // Crisp White Luxury Mattress
    const mattressGeo = new THREE.BoxGeometry(2.2, 0.28, 2.3);
    const mattressMat = new THREE.MeshStandardMaterial({ color: 0xfdfbf7, roughness: 0.9 });
    const mattress = new THREE.Mesh(mattressGeo, mattressMat);
    mattress.position.set(0, 0.46, 0.4);
    mattress.castShadow = true;
    mattress.receiveShadow = true;
    bedroomGroup.add(mattress);

    // Warm Taupe Folded Duvet / Bed Runner
    const duvetGeo = new THREE.BoxGeometry(2.24, 0.14, 1.45);
    const duvetMat = new THREE.MeshStandardMaterial({ color: 0xb59e84, roughness: 0.85 });
    const duvet = new THREE.Mesh(duvetGeo, duvetMat);
    duvet.position.set(0, 0.56, 0.85);
    duvet.castShadow = true;
    bedroomGroup.add(duvet);

    // Pillows (4 plush sleeping pillows)
    const pillowGeo = new THREE.BoxGeometry(0.7, 0.16, 0.4);
    const pillowMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
    const p1 = new THREE.Mesh(pillowGeo, pillowMat);
    p1.position.set(-0.55, 0.66, -0.45);
    p1.castShadow = true;
    bedroomGroup.add(p1);

    const p2 = new THREE.Mesh(pillowGeo, pillowMat);
    p2.position.set(0.55, 0.66, -0.45);
    p2.castShadow = true;
    bedroomGroup.add(p2);

    const pillowBackGeo = new THREE.BoxGeometry(0.75, 0.2, 0.35);
    const pillowBackMat = new THREE.MeshStandardMaterial({ color: 0xd4c2ad, roughness: 0.85 });
    const p3 = new THREE.Mesh(pillowBackGeo, pillowBackMat);
    p3.position.set(-0.55, 0.72, -0.65);
    p3.castShadow = true;
    bedroomGroup.add(p3);

    const p4 = new THREE.Mesh(pillowBackGeo, pillowBackMat);
    p4.position.set(0.55, 0.72, -0.65);
    p4.castShadow = true;
    bedroomGroup.add(p4);

    // Full-Height Cushioned & Fluted Headboard Wall
    const headboardGeo = new THREE.BoxGeometry(3.6, 1.65, 0.12);
    const headboardMat = new THREE.MeshStandardMaterial({ color: 0x4a3b32, roughness: 0.75 });
    const headboard = new THREE.Mesh(headboardGeo, headboardMat);
    headboard.position.set(0, 1.4, -3.35);
    headboard.castShadow = true;
    headboard.receiveShadow = true;
    bedroomGroup.add(headboard);

    // Warm Ambient LED Halo behind Headboard
    const headboardHaloGeo = new THREE.PlaneGeometry(3.65, 1.7);
    const headboardHaloMat = new THREE.MeshBasicMaterial({ color: 0xffaa44 });
    const headboardHalo = new THREE.Mesh(headboardHaloGeo, headboardHaloMat);
    headboardHalo.position.set(0, 1.4, -3.42);
    bedroomGroup.add(headboardHalo);

    // Dual Floating Bedside Nightstands (connected to cabinet finish)
    const nightstandGeo = new THREE.BoxGeometry(0.7, 0.35, 0.45);
    const nightstandMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.15, metalness: 0.1 });
    
    const leftNightstand = new THREE.Mesh(nightstandGeo, nightstandMat);
    leftNightstand.position.set(-1.85, 0.45, -3.15);
    leftNightstand.castShadow = true;
    leftNightstand.receiveShadow = true;
    bedroomGroup.add(leftNightstand);
    cabinetMeshesRef.current.push(leftNightstand);

    const rightNightstand = new THREE.Mesh(nightstandGeo, nightstandMat.clone());
    rightNightstand.position.set(1.85, 0.45, -3.15);
    rightNightstand.castShadow = true;
    rightNightstand.receiveShadow = true;
    bedroomGroup.add(rightNightstand);
    cabinetMeshesRef.current.push(rightNightstand);

    // Bedside Table Designer Lamps
    const lampBaseGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.15, 16);
    const lampBaseMat = new THREE.MeshStandardMaterial({ color: 0xb58038, roughness: 0.3, metalness: 0.8 });
    const lampOrbGeo = new THREE.SphereGeometry(0.11, 16, 16);
    const lampOrbMat = new THREE.MeshBasicMaterial({ color: 0xffe2aa });

    const lamp1Base = new THREE.Mesh(lampBaseGeo, lampBaseMat);
    lamp1Base.position.set(-1.85, 0.7, -3.15);
    bedroomGroup.add(lamp1Base);
    const lamp1Orb = new THREE.Mesh(lampOrbGeo, lampOrbMat);
    lamp1Orb.position.set(-1.85, 0.85, -3.15);
    bedroomGroup.add(lamp1Orb);

    const lamp2Base = new THREE.Mesh(lampBaseGeo, lampBaseMat);
    lamp2Base.position.set(1.85, 0.7, -3.15);
    bedroomGroup.add(lamp2Base);
    const lamp2Orb = new THREE.Mesh(lampOrbGeo, lampOrbMat);
    lamp2Orb.position.set(1.85, 0.85, -3.15);
    bedroomGroup.add(lamp2Orb);

    // Floor-to-Ceiling Wardrobe on Left Wall
    const wardrobeGeo = new THREE.BoxGeometry(0.65, 2.9, 2.8);
    const wardrobeMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.15, metalness: 0.1 });
    const wardrobe = new THREE.Mesh(wardrobeGeo, wardrobeMat);
    wardrobe.position.set(-3.15, 1.5, 0.8);
    wardrobe.castShadow = true;
    wardrobe.receiveShadow = true;
    bedroomGroup.add(wardrobe);
    cabinetMeshesRef.current.push(wardrobe);

    // Wardrobe Designer Handles
    const handleGeo = new THREE.BoxGeometry(0.04, 2.6, 0.04);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0xb58038, roughness: 0.2, metalness: 0.9 });
    const wHandle = new THREE.Mesh(handleGeo, handleMat);
    wHandle.position.set(-2.8, 1.5, 0.8);
    bedroomGroup.add(wHandle);

    // Soft Bedroom Area Rug
    const rugGeo = new THREE.PlaneGeometry(3.2, 3.4);
    const rugMat = new THREE.MeshStandardMaterial({ color: 0xd9d3c7, roughness: 0.95 });
    const rug = new THREE.Mesh(rugGeo, rugMat);
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, 0.01, 0.4);
    rug.receiveShadow = true;
    bedroomGroup.add(rug);

    scene.add(bedroomGroup);
    bedroomGroupRef.current = bedroomGroup;
    bedroomGroup.visible = selections.roomType === 'bedroom';

    // ==========================================
    // ROOM TEMPLATE 3: MODULAR CHEF KITCHEN GROUP
    // ==========================================
    const kitchenGroup = new THREE.Group();

    // Main Counter Base Cabinets
    const kitchenBaseGeo = new THREE.BoxGeometry(4.4, 0.88, 0.85);
    const kitchenBaseMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.12, metalness: 0.15 });
    const kitchenBase = new THREE.Mesh(kitchenBaseGeo, kitchenBaseMat);
    kitchenBase.position.set(0, 0.44, -3.05);
    kitchenBase.castShadow = true;
    kitchenBase.receiveShadow = true;
    kitchenGroup.add(kitchenBase);
    cabinetMeshesRef.current.push(kitchenBase);

    // Seamless Engineered Quartz Countertop with Waterfall Edge
    const counterTopGeo = new THREE.BoxGeometry(4.5, 0.08, 0.9);
    const counterTopMat = new THREE.MeshStandardMaterial({ color: 0xf8f9fa, roughness: 0.08, metalness: 0.1 });
    const counterTop = new THREE.Mesh(counterTopGeo, counterTopMat);
    counterTop.position.set(0, 0.92, -3.05);
    counterTop.castShadow = true;
    counterTop.receiveShadow = true;
    kitchenGroup.add(counterTop);

    // Ceramic Induction Cooktop
    const cooktopGeo = new THREE.BoxGeometry(1.0, 0.02, 0.55);
    const cooktopMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2 });
    const cooktop = new THREE.Mesh(cooktopGeo, cooktopMat);
    cooktop.position.set(-0.9, 0.97, -3.05);
    kitchenGroup.add(cooktop);

    // Sleek Stainless Steel & Glass Chimney Hood
    const chimneyFlueGeo = new THREE.BoxGeometry(0.35, 0.8, 0.3);
    const chimneyFlueMat = new THREE.MeshStandardMaterial({ color: 0xd6d8db, roughness: 0.2, metalness: 0.9 });
    const chimneyFlue = new THREE.Mesh(chimneyFlueGeo, chimneyFlueMat);
    chimneyFlue.position.set(-0.9, 2.8, -3.2);
    kitchenGroup.add(chimneyFlue);

    const chimneyHoodGeo = new THREE.BoxGeometry(1.05, 0.35, 0.55);
    const chimneyHoodMat = new THREE.MeshStandardMaterial({ color: 0x22262a, roughness: 0.3, metalness: 0.7 });
    const chimneyHood = new THREE.Mesh(chimneyHoodGeo, chimneyHoodMat);
    chimneyHood.position.set(-0.9, 2.15, -3.1);
    chimneyHood.castShadow = true;
    kitchenGroup.add(chimneyHood);

    // Undermount Double Bowl Sink
    const sinkGeo = new THREE.BoxGeometry(0.9, 0.04, 0.5);
    const sinkMat = new THREE.MeshStandardMaterial({ color: 0x9aa0a6, roughness: 0.2, metalness: 0.8 });
    const sink = new THREE.Mesh(sinkGeo, sinkMat);
    sink.position.set(1.0, 0.96, -3.05);
    kitchenGroup.add(sink);

    // Brushed Brass Gooseneck Faucet
    const faucetGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.35, 12);
    const faucetMat = new THREE.MeshStandardMaterial({ color: 0xb58038, roughness: 0.2, metalness: 0.9 });
    const faucet = new THREE.Mesh(faucetGeo, faucetMat);
    faucet.position.set(1.0, 1.15, -3.25);
    kitchenGroup.add(faucet);

    // Upper Overhead Lift-Up Cabinets
    const kitchenUpperGeo = new THREE.BoxGeometry(4.4, 0.75, 0.42);
    const kitchenUpperMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.12, metalness: 0.15 });
    const kitchenUpper = new THREE.Mesh(kitchenUpperGeo, kitchenUpperMat);
    kitchenUpper.position.set(0, 2.3, -3.25);
    kitchenUpper.castShadow = true;
    kitchenUpper.receiveShadow = true;
    kitchenGroup.add(kitchenUpper);
    cabinetMeshesRef.current.push(kitchenUpper);

    // Under-Cabinet LED Task Light Strip
    const taskLightGeo = new THREE.PlaneGeometry(4.2, 0.05);
    const taskLightMat = new THREE.MeshBasicMaterial({ color: 0xffeedd });
    const taskLight = new THREE.Mesh(taskLightGeo, taskLightMat);
    taskLight.position.set(0, 1.91, -3.15);
    kitchenGroup.add(taskLight);

    // Island Breakfast Counter Bar
    const islandBaseGeo = new THREE.BoxGeometry(2.4, 0.9, 0.8);
    const islandBaseMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.12, metalness: 0.15 });
    const islandBase = new THREE.Mesh(islandBaseGeo, islandBaseMat);
    islandBase.position.set(0, 0.45, 0.6);
    islandBase.castShadow = true;
    islandBase.receiveShadow = true;
    kitchenGroup.add(islandBase);
    cabinetMeshesRef.current.push(islandBase);

    // Island Quartz Top with Dining Overhang
    const islandTopGeo = new THREE.BoxGeometry(2.5, 0.08, 0.95);
    const islandTop = new THREE.Mesh(islandTopGeo, counterTopMat);
    islandTop.position.set(0, 0.94, 0.6);
    islandTop.castShadow = true;
    kitchenGroup.add(islandTop);

    // 2 Minimalist Modern Bar Stools
    const stoolSeatGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.06, 24);
    const stoolSeatMat = new THREE.MeshStandardMaterial({ color: 0x3d2b1f, roughness: 0.5 });
    const stoolLegGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.65, 8);
    const stoolLegMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3, metalness: 0.8 });

    const stool1 = new THREE.Mesh(stoolSeatGeo, stoolSeatMat);
    stool1.position.set(-0.6, 0.65, 1.35);
    stool1.castShadow = true;
    kitchenGroup.add(stool1);
    const stool1Leg = new THREE.Mesh(stoolLegGeo, stoolLegMat);
    stool1Leg.position.set(-0.6, 0.32, 1.35);
    kitchenGroup.add(stool1Leg);

    const stool2 = new THREE.Mesh(stoolSeatGeo, stoolSeatMat);
    stool2.position.set(0.6, 0.65, 1.35);
    stool2.castShadow = true;
    kitchenGroup.add(stool2);
    const stool2Leg = new THREE.Mesh(stoolLegGeo, stoolLegMat);
    stool2Leg.position.set(0.6, 0.32, 1.35);
    kitchenGroup.add(stool2Leg);

    scene.add(kitchenGroup);
    kitchenGroupRef.current = kitchenGroup;
    kitchenGroup.visible = selections.roomType === 'kitchen';

    // ==========================================
    // ROOM TEMPLATE 4: LUXURY SPA BATHROOM GROUP
    // ==========================================
    const bathroomGroup = new THREE.Group();

    // 1. Floating Double Vanity Cabinet Base
    const vanityBaseGeo = new THREE.BoxGeometry(3.0, 0.55, 0.65);
    const vanityBaseMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.15, metalness: 0.1 });
    const vanityBase = new THREE.Mesh(vanityBaseGeo, vanityBaseMat);
    vanityBase.position.set(0, 0.58, -3.15);
    vanityBase.castShadow = true;
    vanityBase.receiveShadow = true;
    bathroomGroup.add(vanityBase);
    cabinetMeshesRef.current.push(vanityBase);

    // Vanity Drawer Fluted / Brass Accents
    const vanityTrimGeo = new THREE.BoxGeometry(2.9, 0.02, 0.67);
    const bathBrassMat = new THREE.MeshStandardMaterial({ color: 0xb58038, roughness: 0.25, metalness: 0.85 });
    const vanityTrim = new THREE.Mesh(vanityTrimGeo, bathBrassMat);
    vanityTrim.position.set(0, 0.85, -3.15);
    bathroomGroup.add(vanityTrim);

    // 2. Seamless White Quartz Double Vanity Countertop
    const vanityTopGeo = new THREE.BoxGeometry(3.1, 0.08, 0.7);
    const vanityTopMat = new THREE.MeshStandardMaterial({ color: 0xf4f6f8, roughness: 0.08, metalness: 0.15 });
    const vanityTop = new THREE.Mesh(vanityTopGeo, vanityTopMat);
    vanityTop.position.set(0, 0.9, -3.15);
    vanityTop.castShadow = true;
    vanityTop.receiveShadow = true;
    bathroomGroup.add(vanityTop);

    // 3. Dual Undermount Basins
    const basinGeo = new THREE.CylinderGeometry(0.28, 0.22, 0.12, 24);
    const basinMat = new THREE.MeshStandardMaterial({ color: 0x11161d, roughness: 0.1 });
    const basinL = new THREE.Mesh(basinGeo, basinMat);
    basinL.position.set(-0.85, 0.94, -3.15);
    bathroomGroup.add(basinL);

    const basinR = new THREE.Mesh(basinGeo, basinMat);
    basinR.position.set(0.85, 0.94, -3.15);
    bathroomGroup.add(basinR);

    // Dual Tall Brushed Brass Gooseneck Faucets
    const faucetStemGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.32, 12);
    const faucetStemL = new THREE.Mesh(faucetStemGeo, bathBrassMat);
    faucetStemL.position.set(-0.85, 1.1, -3.35);
    bathroomGroup.add(faucetStemL);

    const faucetStemR = new THREE.Mesh(faucetStemGeo, bathBrassMat);
    faucetStemR.position.set(0.85, 1.1, -3.35);
    bathroomGroup.add(faucetStemR);

    // 4. Twin Luxury Arched LED Vanity Mirrors (Centered over each basin - Eliminates TV appearance)
    [-0.85, 0.85].forEach((mx) => {
      // Warm Halo LED Backlight Plate
      const haloGeo = new THREE.BoxGeometry(0.88, 1.28, 0.02);
      const haloMat = new THREE.MeshBasicMaterial({ color: 0xffe6b8 });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.set(mx, 1.82, -3.44);
      bathroomGroup.add(halo);

      // Brushed Brass Beveled Mirror Frame
      const frameGeo = new THREE.BoxGeometry(0.82, 1.22, 0.03);
      const frame = new THREE.Mesh(frameGeo, bathBrassMat);
      frame.position.set(mx, 1.82, -3.42);
      bathroomGroup.add(frame);

      // Silvered Crystal Mirror Glass (Luminous silver-sky reflectivity, never pitch-black)
      const mirrorGlassGeo = new THREE.BoxGeometry(0.76, 1.16, 0.015);
      const mirrorGlassMat = new THREE.MeshStandardMaterial({
        color: 0xf2f7fc,
        roughness: 0.15,
        metalness: 0.2
      });
      const mirrorGlass = new THREE.Mesh(mirrorGlassGeo, mirrorGlassMat);
      mirrorGlass.position.set(mx, 1.82, -3.4);
      bathroomGroup.add(mirrorGlass);

      // Circular Smart Touch Defogger Icon
      const sensorGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.005, 16);
      const sensorMat = new THREE.MeshBasicMaterial({ color: 0x64b5f6 });
      const sensor = new THREE.Mesh(sensorGeo, sensorMat);
      sensor.rotation.x = Math.PI / 2;
      sensor.position.set(mx, 1.38, -3.39);
      bathroomGroup.add(sensor);
    });

    // Center Vertical Fluted Brass & Opal Glass Wall Sconce
    const sconceMountGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.72, 12);
    const sconceMount = new THREE.Mesh(sconceMountGeo, bathBrassMat);
    sconceMount.position.set(0, 1.82, -3.4);
    bathroomGroup.add(sconceMount);

    const sconceTubeGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.45, 16);
    const sconceTubeMat = new THREE.MeshBasicMaterial({ color: 0xffeed4 });
    const sconceTube = new THREE.Mesh(sconceTubeGeo, sconceTubeMat);
    sconceTube.position.set(0, 1.82, -3.37);
    bathroomGroup.add(sconceTube);

    // 5. Frameless Walk-in Shower Cubicle (Right side)
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xa8c5da,
      roughness: 0.05,
      metalness: 0.1,
      transparent: true,
      opacity: 0.32
    });
    const showerScreenGeo = new THREE.BoxGeometry(0.04, 2.7, 2.2);
    const showerScreen = new THREE.Mesh(showerScreenGeo, glassMat);
    showerScreen.position.set(2.1, 1.35, -1.2);
    bathroomGroup.add(showerScreen);

    // Chrome Shower Screen Hardware Bar
    const showerBarGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.35, 12);
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.1, metalness: 0.95 });
    const showerBar = new THREE.Mesh(showerBarGeo, chromeMat);
    showerBar.rotation.z = Math.PI / 2;
    showerBar.position.set(2.77, 2.65, -1.2);
    bathroomGroup.add(showerBar);

    // Overhead Ceiling Rain Shower Head
    const rainHeadGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.02, 24);
    const rainHead = new THREE.Mesh(rainHeadGeo, chromeMat);
    rainHead.position.set(2.8, 2.85, -1.2);
    bathroomGroup.add(rainHead);

    const rainStemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.25, 8);
    const rainStem = new THREE.Mesh(rainStemGeo, chromeMat);
    rainStem.position.set(2.8, 2.95, -1.2);
    bathroomGroup.add(rainStem);

    // 6. Freestanding Luxury Bathtub (Center-Left)
    const tubGroup = new THREE.Group();
    const tubOuterGeo = new THREE.CylinderGeometry(0.75, 0.65, 0.72, 32);
    tubOuterGeo.scale(1.5, 1, 0.85);
    const tubMat = new THREE.MeshStandardMaterial({ color: 0xfdfdfd, roughness: 0.12, metalness: 0.05 });
    const tubOuter = new THREE.Mesh(tubOuterGeo, tubMat);
    tubOuter.position.set(-1.1, 0.36, 0.8);
    tubOuter.castShadow = true;
    tubOuter.receiveShadow = true;
    tubGroup.add(tubOuter);

    const tubInnerGeo = new THREE.CylinderGeometry(0.68, 0.58, 0.65, 32);
    tubInnerGeo.scale(1.42, 1, 0.78);
    const tubInnerMat = new THREE.MeshStandardMaterial({ color: 0xf4f6f8, roughness: 0.15 });
    const tubInner = new THREE.Mesh(tubInnerGeo, tubInnerMat);
    tubInner.position.set(-1.1, 0.42, 0.8);
    tubGroup.add(tubInner);

    // Crystal Clear Water Plane inside Bathtub
    const waterGeo = new THREE.PlaneGeometry(1.6, 0.95);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x5aa8cc,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.75
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.set(-1.1, 0.6, 0.8);
    tubGroup.add(water);

    // Freestanding Brass Floor Mixer Faucet
    const floorMixerStemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.95, 12);
    const floorMixerStem = new THREE.Mesh(floorMixerStemGeo, bathBrassMat);
    floorMixerStem.position.set(-0.05, 0.48, 0.8);
    tubGroup.add(floorMixerStem);

    const floorMixerSpoutGeo = new THREE.BoxGeometry(0.22, 0.03, 0.03);
    const floorMixerSpout = new THREE.Mesh(floorMixerSpoutGeo, bathBrassMat);
    floorMixerSpout.position.set(-0.15, 0.95, 0.8);
    tubGroup.add(floorMixerSpout);

    bathroomGroup.add(tubGroup);

    // 7. Wall-Hung Modern Smart WC / Commode Unit (Left Wall)
    const wcGroup = new THREE.Group();
    const flushPlateGeo = new THREE.BoxGeometry(0.02, 0.16, 0.24);
    const flushPlate = new THREE.Mesh(flushPlateGeo, bathBrassMat);
    flushPlate.position.set(-3.48, 1.05, -0.55);
    wcGroup.add(flushPlate);

    const wcBowlGeo = new THREE.BoxGeometry(0.42, 0.38, 0.58);
    const wcMat = new THREE.MeshStandardMaterial({ color: 0xfcfcfc, roughness: 0.15, metalness: 0.05 });
    const wcBowl = new THREE.Mesh(wcBowlGeo, wcMat);
    wcBowl.position.set(-3.22, 0.44, -0.55);
    wcBowl.castShadow = true;
    wcBowl.receiveShadow = true;
    wcGroup.add(wcBowl);

    const wcSeatGeo = new THREE.BoxGeometry(0.44, 0.04, 0.6);
    const wcSeat = new THREE.Mesh(wcSeatGeo, wcMat);
    wcSeat.position.set(-3.22, 0.64, -0.55);
    wcGroup.add(wcSeat);

    const jetSprayGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.15, 8);
    const jetSpray = new THREE.Mesh(jetSprayGeo, bathBrassMat);
    jetSpray.position.set(-3.45, 0.65, -0.15);
    wcGroup.add(jetSpray);

    bathroomGroup.add(wcGroup);

    // 8. Tall Bathroom Linen / Storage Cabinet
    const linenCabGeo = new THREE.BoxGeometry(0.55, 2.6, 0.8);
    const linenCabMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.15, metalness: 0.1 });
    const linenCab = new THREE.Mesh(linenCabGeo, linenCabMat);
    linenCab.position.set(-3.18, 1.35, -1.8);
    linenCab.castShadow = true;
    linenCab.receiveShadow = true;
    bathroomGroup.add(linenCab);
    cabinetMeshesRef.current.push(linenCab);

    // 9. Brass Heated Towel Warmer Rail
    const towelRailGroup = new THREE.Group();
    const railVerticalGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.4, 8);
    const railL = new THREE.Mesh(railVerticalGeo, bathBrassMat);
    railL.position.set(-3.35, 1.5, 0.25);
    towelRailGroup.add(railL);
    const railR = new THREE.Mesh(railVerticalGeo, bathBrassMat);
    railR.position.set(-3.35, 1.5, 0.85);
    towelRailGroup.add(railR);

    for (let r = 0; r < 4; r++) {
      const rBarGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.6, 8);
      const rBar = new THREE.Mesh(rBarGeo, bathBrassMat);
      rBar.rotation.x = Math.PI / 2;
      rBar.position.set(-3.35, 1.0 + r * 0.35, 0.55);
      towelRailGroup.add(rBar);
    }
    const towelGeo = new THREE.BoxGeometry(0.12, 0.45, 0.48);
    const towelMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.9 });
    const towel = new THREE.Mesh(towelGeo, towelMat);
    towel.position.set(-3.3, 1.35, 0.55);
    towelRailGroup.add(towel);
    bathroomGroup.add(towelRailGroup);

    // 10. Spa Greenery Accent Planter
    const spaPotGeo = new THREE.CylinderGeometry(0.24, 0.18, 0.52, 20);
    const spaPotMat = new THREE.MeshStandardMaterial({ color: 0x22262a, roughness: 0.85 });
    const spaPot = new THREE.Mesh(spaPotGeo, spaPotMat);
    spaPot.position.set(-2.5, 0.26, 1.8);
    spaPot.castShadow = true;
    bathroomGroup.add(spaPot);

    const leafMat = new THREE.MeshStandardMaterial({ color: 0x2e6b3e, roughness: 0.6 });
    for (let l = 0; l < 5; l++) {
      const leafGeo = new THREE.BoxGeometry(0.2, 0.45, 0.02);
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(-2.5 + (l - 2) * 0.08, 0.65, 1.8 + (l % 2 === 0 ? 0.06 : -0.06));
      leaf.rotation.z = (l - 2) * 0.25;
      leaf.rotation.y = l * 0.6;
      bathroomGroup.add(leaf);
    }

    scene.add(bathroomGroup);
    bathroomGroupRef.current = bathroomGroup;
    bathroomGroup.visible = selections.roomType === 'bathroom';

    // ==========================================
    // ROOM TEMPLATE 5: CORPORATE EXECUTIVE OFFICE
    // ==========================================
    const officeGroup = new THREE.Group();

    // 1. Executive Director Desk Top & Modesty Panel
    const deskTopGeo = new THREE.BoxGeometry(2.8, 0.08, 1.25);
    const deskMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.15, metalness: 0.1 });
    const deskTop = new THREE.Mesh(deskTopGeo, deskMat);
    deskTop.position.set(0, 0.76, -0.9);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    officeGroup.add(deskTop);
    cabinetMeshesRef.current.push(deskTop);

    const modestyGeo = new THREE.BoxGeometry(2.6, 0.65, 0.06);
    const modesty = new THREE.Mesh(modestyGeo, deskMat);
    modesty.position.set(0, 0.35, -0.32);
    modesty.castShadow = true;
    modesty.receiveShadow = true;
    officeGroup.add(modesty);
    cabinetMeshesRef.current.push(modesty);

    // Return Credenza / Pedestal Drawers (L-shape workstation)
    const returnCredenzaGeo = new THREE.BoxGeometry(0.65, 0.68, 1.8);
    const returnCredenza = new THREE.Mesh(returnCredenzaGeo, deskMat);
    returnCredenza.position.set(1.3, 0.34, -1.2);
    returnCredenza.castShadow = true;
    returnCredenza.receiveShadow = true;
    officeGroup.add(returnCredenza);
    cabinetMeshesRef.current.push(returnCredenza);

    // Leather Executive Desk Blotter Pad
    const blotterGeo = new THREE.BoxGeometry(1.3, 0.015, 0.65);
    const blotterMat = new THREE.MeshStandardMaterial({ color: 0x1f2328, roughness: 0.7 });
    const blotter = new THREE.Mesh(blotterGeo, blotterMat);
    blotter.position.set(0, 0.81, -0.95);
    officeGroup.add(blotter);

    // Sleek Ultrawide Curved Display Monitor
    const monitorGeo = new THREE.BoxGeometry(1.2, 0.42, 0.03);
    const monitorMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2, metalness: 0.8 });
    const monitor = new THREE.Mesh(monitorGeo, monitorMat);
    monitor.position.set(0, 1.15, -1.25);
    officeGroup.add(monitor);

    const screenGeo = new THREE.PlaneGeometry(1.16, 0.38);
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x2d4361 });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 1.15, -1.23);
    officeGroup.add(screen);

    const standPoleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.35, 12);
    const standPole = new THREE.Mesh(standPoleGeo, chromeMat);
    standPole.position.set(0, 0.95, -1.25);
    officeGroup.add(standPole);

    // 2. High-Back Ergonomic Leather Director Chair
    const chairGroup = new THREE.Group();
    const chairMat = new THREE.MeshStandardMaterial({ color: 0x221f1d, roughness: 0.65 });
    
    const chairSeatGeo = new THREE.BoxGeometry(0.68, 0.12, 0.65);
    const chairSeat = new THREE.Mesh(chairSeatGeo, chairMat);
    chairSeat.position.set(0, 0.52, -1.95);
    chairSeat.castShadow = true;
    chairGroup.add(chairSeat);

    const chairBackGeo = new THREE.BoxGeometry(0.62, 0.82, 0.1);
    const chairBack = new THREE.Mesh(chairBackGeo, chairMat);
    chairBack.position.set(0, 1.0, -2.25);
    chairBack.castShadow = true;
    chairGroup.add(chairBack);

    const headrestGeo = new THREE.BoxGeometry(0.42, 0.2, 0.08);
    const headrest = new THREE.Mesh(headrestGeo, chairMat);
    headrest.position.set(0, 1.48, -2.22);
    chairGroup.add(headrest);

    const chairStemGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.45, 12);
    const chairStem = new THREE.Mesh(chairStemGeo, chromeMat);
    chairStem.position.set(0, 0.25, -1.95);
    chairGroup.add(chairStem);

    const legStarGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.04, 5);
    const legStar = new THREE.Mesh(legStarGeo, chromeMat);
    legStar.position.set(0, 0.04, -1.95);
    chairGroup.add(legStar);

    officeGroup.add(chairGroup);

    // 3. Client Visitor Chairs (2 sleek chairs)
    const visitorMat = new THREE.MeshStandardMaterial({ color: 0x3d352e, roughness: 0.7 });
    [-0.75, 0.75].forEach((vx) => {
      const vSeatGeo = new THREE.BoxGeometry(0.55, 0.08, 0.55);
      const vSeat = new THREE.Mesh(vSeatGeo, visitorMat);
      vSeat.position.set(vx, 0.48, 0.35);
      vSeat.castShadow = true;
      officeGroup.add(vSeat);

      const vBackGeo = new THREE.BoxGeometry(0.52, 0.48, 0.06);
      const vBack = new THREE.Mesh(vBackGeo, visitorMat);
      vBack.position.set(vx, 0.78, 0.6);
      vBack.castShadow = true;
      officeGroup.add(vBack);

      const vLegGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.45, 8);
      const vLeg = new THREE.Mesh(vLegGeo, chromeMat);
      vLeg.position.set(vx, 0.23, 0.35);
      officeGroup.add(vLeg);
    });

    // 4. Full-Height Executive Library Wall Unit (Back Wall)
    const libraryBaseGeo = new THREE.BoxGeometry(4.8, 0.75, 0.48);
    const libraryBase = new THREE.Mesh(libraryBaseGeo, deskMat);
    libraryBase.position.set(0, 0.38, -3.22);
    libraryBase.castShadow = true;
    libraryBase.receiveShadow = true;
    officeGroup.add(libraryBase);
    cabinetMeshesRef.current.push(libraryBase);

    const shelfFrameGeo = new THREE.BoxGeometry(4.8, 2.1, 0.42);
    const shelfMat = new THREE.MeshStandardMaterial({ color: 0x1f2328, roughness: 0.8 });
    const shelfFrame = new THREE.Mesh(shelfFrameGeo, shelfMat);
    shelfFrame.position.set(0, 1.82, -3.25);
    shelfFrame.castShadow = true;
    shelfFrame.receiveShadow = true;
    officeGroup.add(shelfFrame);

    // Bookshelf Backlit Warm LED Strips
    for (let s = 0; s < 3; s++) {
      const ledStripGeo = new THREE.PlaneGeometry(4.6, 0.04);
      const ledStripMat = new THREE.MeshBasicMaterial({ color: 0xffe2aa });
      const ledStrip = new THREE.Mesh(ledStripGeo, ledStripMat);
      ledStrip.position.set(0, 1.1 + s * 0.65, -3.03);
      officeGroup.add(ledStrip);
    }

    // 5. Suspended Architectural Linear LED Bar Over Desk
    const linearLightGeo = new THREE.BoxGeometry(2.4, 0.04, 0.06);
    const linearLightMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2, metalness: 0.8 });
    const linearLight = new THREE.Mesh(linearLightGeo, linearLightMat);
    linearLight.position.set(0, 2.55, -0.9);
    officeGroup.add(linearLight);

    const linearGlowGeo = new THREE.PlaneGeometry(2.35, 0.05);
    const linearGlowMat = new THREE.MeshBasicMaterial({ color: 0xfff3e0 });
    const linearGlow = new THREE.Mesh(linearGlowGeo, linearGlowMat);
    linearGlow.rotation.x = Math.PI / 2;
    linearGlow.position.set(0, 2.525, -0.9);
    officeGroup.add(linearGlow);

    [-1.0, 1.0].forEach((wx) => {
      const wireGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.5, 6);
      const wire = new THREE.Mesh(wireGeo, chromeMat);
      wire.position.set(wx, 2.8, -0.9);
      officeGroup.add(wire);
    });

    scene.add(officeGroup);
    officeGroupRef.current = officeGroup;
    officeGroup.visible = selections.roomType === 'office';

    // 6. Orbit Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // 7. Event Listeners for Mouse / Touch Orbiting
    const domEl = renderer.domElement;

    const onPointerDown = (e: PointerEvent) => {
      orbitState.current.isDragging = true;
      orbitState.current.prevX = e.clientX;
      orbitState.current.prevY = e.clientY;
      domEl.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!orbitState.current.isDragging) return;
      const dx = e.clientX - orbitState.current.prevX;
      const dy = e.clientY - orbitState.current.prevY;
      orbitState.current.prevX = e.clientX;
      orbitState.current.prevY = e.clientY;

      orbitState.current.theta -= dx * 0.007;
      orbitState.current.phi = Math.max(0.15, Math.min(Math.PI / 2.05, orbitState.current.phi - dy * 0.007));

      updateCameraPosition();
    };

    const onPointerUp = (e: PointerEvent) => {
      orbitState.current.isDragging = false;
      try {
        domEl.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      orbitState.current.radius = Math.max(3.8, Math.min(10.5, orbitState.current.radius + e.deltaY * 0.004));
      updateCameraPosition();
    };

    domEl.addEventListener('pointerdown', onPointerDown);
    domEl.addEventListener('pointermove', onPointerMove);
    domEl.addEventListener('pointerup', onPointerUp);
    domEl.addEventListener('wheel', onWheel, { passive: false });

    // Handle Resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 460;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('pointerdown', onPointerDown);
      domEl.removeEventListener('pointermove', onPointerMove);
      domEl.removeEventListener('pointerup', onPointerUp);
      domEl.removeEventListener('wheel', onWheel);

      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, []);

  // Update Camera in Orbit
  const updateCameraPosition = () => {
    if (!cameraRef.current) return;
    const { theta, phi, radius, target } = orbitState.current;
    const x = target.x + radius * Math.sin(phi) * Math.sin(theta);
    const y = target.y + radius * Math.cos(phi);
    const z = target.z + radius * Math.sin(phi) * Math.cos(theta);

    cameraRef.current.position.set(x, y, z);
    cameraRef.current.lookAt(target);
  };

  // Set Preset Camera Angle
  const setCameraPreset = (preset: 'perspective' | 'front' | 'top') => {
    if (preset === 'perspective') {
      orbitState.current.theta = Math.PI / 4.2;
      orbitState.current.phi = Math.PI / 3.2;
      orbitState.current.radius = 6.8;
      orbitState.current.target.set(0, 1.2, 0);
    } else if (preset === 'front') {
      orbitState.current.theta = 0;
      orbitState.current.phi = Math.PI / 2.3;
      orbitState.current.radius = 5.6;
      orbitState.current.target.set(0, 1.3, -2.5);
    } else if (preset === 'top') {
      orbitState.current.theta = Math.PI / 4;
      orbitState.current.phi = 0.35;
      orbitState.current.radius = 8.2;
      orbitState.current.target.set(0, 0.8, 0);
    }
    updateCameraPosition();
  };

  // Sync Selections with Three.js Material, Lighting, and Room Template
  useEffect(() => {
    // 1. Room Template Visibility (Living vs Bedroom vs Kitchen vs Bathroom vs Office)
    if (livingGroupRef.current) livingGroupRef.current.visible = selections.roomType === 'living';
    if (bedroomGroupRef.current) bedroomGroupRef.current.visible = selections.roomType === 'bedroom';
    if (kitchenGroupRef.current) kitchenGroupRef.current.visible = selections.roomType === 'kitchen';
    if (bathroomGroupRef.current) bathroomGroupRef.current.visible = selections.roomType === 'bathroom';
    if (officeGroupRef.current) officeGroupRef.current.visible = selections.roomType === 'office';

    // 2. Wall Finish & Louver Slats
    const wallConfig = WALL_FINISHES.find((w) => w.id === selections.wallFinish) || WALL_FINISHES[0];
    if (wallMeshRef.current) {
      const mat = wallMeshRef.current.material as THREE.MeshStandardMaterial;
      mat.color.setHex(wallConfig.threeColor);
      mat.needsUpdate = true;
    }

    if (louversGroupRef.current) {
      // If user chose fluted-teak, show 3D slats; otherwise hide them
      louversGroupRef.current.visible = selections.wallFinish === 'fluted-teak';
    }

    // 3. Cabinet Finish (Applies to Living Credenza, Bedroom Wardrobe/Nightstands, Kitchen Base/Upper/Island)
    const cabConfig = CABINET_FINISHES.find((c) => c.id === selections.cabinetFinish) || CABINET_FINISHES[0];
    cabinetMeshesRef.current.forEach((mesh) => {
      if (mesh && mesh.material) {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.color.setHex(cabConfig.threeColor);
        mat.roughness = cabConfig.roughness;
        mat.metalness = cabConfig.metalness;
        mat.needsUpdate = true;
      }
    });

    // 4. Flooring Finish
    const floorConfig = FLOORING_FINISHES.find((f) => f.id === selections.flooring) || FLOORING_FINISHES[0];
    if (floorMeshRef.current) {
      const mat = floorMeshRef.current.material as THREE.MeshStandardMaterial;
      mat.color.setHex(floorConfig.threeColor);
      mat.roughness = floorConfig.roughness;
      mat.needsUpdate = true;
    }

    // 5. Lighting Mood
    const lightConfig = LIGHTING_MOODS.find((l) => l.id === selections.lightingMood) || LIGHTING_MOODS[0];
    if (coveLightRef.current && coveStripMeshRef.current && ambientLightRef.current) {
      coveLightRef.current.color.setHex(lightConfig.coveColor);
      const coveStripMat = coveStripMeshRef.current.material as THREE.MeshBasicMaterial;
      coveStripMat.color.setHex(lightConfig.coveColor);
      ambientLightRef.current.color.setHex(lightConfig.ambientColor);
      ambientLightRef.current.intensity = lightConfig.ambientIntensity ?? 1.0;
    }
  }, [selections]);

  // Handle Add to Quotation
  const handleAddCustomRoomToQuote = () => {
    // Add primary marine ply substrate and recommended products
    const primaryPlywood = (productsData as unknown as Product[]).find((p) => p.id === 'prod-1') || (productsData as unknown as Product[])[0];
    const laminateProduct = (productsData as unknown as Product[]).find((p) => p.id === 'prod-2') || (productsData as unknown as Product[])[1];

    addItem(primaryPlywood, 24, 'CenturyPly 710 BWP 19mm Marine Grade');
    addItem(laminateProduct, 6, selections.cabinetFinish);

    showToast(`Added custom 3D ${selections.roomType.toUpperCase()} package (${pricing.formattedTotal}) to your quotation list!`, 'success');
  };

  // Download Spec Summary TXT
  const handleDownloadSummary = () => {
    const lines = [
      '===========================================================',
      'SHREE SHYAM INTERIOR — CUSTOM 3D TURNKEY SPECIFICATION SHEET',
      'Location: Station Road / Piprali Road, Sikar, Rajasthan',
      '===========================================================',
      `Date: ${new Date().toLocaleDateString('en-IN')}`,
      `Room Type: ${selections.roomType.toUpperCase()} SUITE`,
      `Total Estimated Turnkey Cost: ${pricing.formattedTotal}`,
      '-----------------------------------------------------------',
      'SPECIFIED MATERIALS & ARCHITECTURAL FINISHES:',
      ...pricing.items.map(
        (it, idx) => `${idx + 1}. [${it.category}] ${it.name} (${it.brand})\n   Specification: ${it.specification}\n   Cost Est: ₹${it.cost.toLocaleString('en-IN')}`
      ),
      '-----------------------------------------------------------',
      `Turnkey Certified Labor & Installation: ₹${pricing.laborAndInstallation.toLocaleString('en-IN')}`,
      `Grand Total Turnkey (BWP 710 Core + Fittings + Labor): ${pricing.formattedTotal}`,
      '===========================================================',
      'To book your complimentary in-person site measurement:',
      'Phone: +91 98290 12345 | Website: http://localhost:3000/site-visit',
      '==========================================================='
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shree-shyam-3d-${selections.roomType}-specs.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Downloaded 3D Room Specification Sheet!', 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Visualizer Hero Header */}
      <div className="bg-white dark:bg-forest-900/90 border border-cream-200 dark:border-copper-500/40 rounded-3xl p-6 sm:p-8 shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-cream-200 dark:border-cream-200/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-copper-500/15 text-[#B57731] dark:text-copper-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time 3D WebGL Configurator & Dynamic Cost Engine</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-forest-950 dark:text-cream-50">
              Interactive 3D Room Studio
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 dark:text-cream-200/80 mt-1 max-w-2xl">
              Rotate in 360°, customize wall finishes, furniture laminates, marble and lighting. Watch your 3D room transform instantly while the certified turnkey cost calculates live in ₹ INR.
            </p>
          </div>

          {/* Room Type Selector */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-cream-100 dark:bg-forest-950 border border-cream-200 dark:border-cream-200/10 self-start lg:self-auto overflow-x-auto max-w-full">
            {[
              { id: 'living', label: 'Living Lounge' },
              { id: 'bedroom', label: 'Master Suite' },
              { id: 'kitchen', label: 'Modular Kitchen' },
              { id: 'bathroom', label: 'Spa Bathroom' },
              { id: 'office', label: 'Director Office' }
            ].map((rm) => (
              <button
                key={rm.id}
                type="button"
                onClick={() => {
                  const rmId = rm.id as 'living' | 'bedroom' | 'kitchen' | 'bathroom' | 'office';
                  setSelections((prev) => ({ ...prev, roomType: rmId }));
                  setCameraPreset('perspective');
                  showToast(`Switched 3D room template to ${rm.label}!`, 'info');
                }}
                className={`whitespace-nowrap px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selections.roomType === rm.id
                    ? 'bg-[#B57731] text-white shadow-md'
                    : 'text-charcoal-600 dark:text-cream-200 hover:text-[#B57731]'
                }`}
              >
                {rm.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Canvas + Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
          {/* Left Column: 3D Canvas Viewport */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col space-y-3">
            <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden border border-cream-200 dark:border-copper-500/30 bg-[#13171b] shadow-elevated">
              {/* Three.js Canvas Mount */}
              <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

              {/* Floating 3D HUD Badges */}
              <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 pointer-events-none">
                <div className="px-3 py-1 rounded-full bg-forest-950/85 backdrop-blur-md text-cream-100 text-[11px] font-bold border border-white/10 flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>360° Interactive 3D WebGL</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-forest-950/85 backdrop-blur-md text-amber-300 text-[11px] font-bold border border-white/10 flex items-center gap-1.5 shadow-md">
                  <Sun className="w-3 h-3" />
                  <span className="capitalize">{selections.lightingMood.replace('-', ' ')}</span>
                </div>
              </div>

              {/* Drag Hint at Bottom Center */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-forest-950/80 backdrop-blur-md text-cream-200 text-[11px] font-medium border border-white/10 pointer-events-none flex items-center gap-2 shadow-lg">
                <span>🖱️ Drag to rotate 360° • Scroll to zoom</span>
              </div>

              {/* Camera Angle Presets Toolbar */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-forest-950/90 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-lg">
                <button
                  type="button"
                  onClick={() => setCameraPreset('perspective')}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white/10 hover:bg-white/20 text-cream-100 transition-colors"
                  title="Default 3D Perspective Angle"
                >
                  3D View
                </button>
                <button
                  type="button"
                  onClick={() => setCameraPreset('front')}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white/10 hover:bg-white/20 text-cream-100 transition-colors"
                  title="Front TV Wall View"
                >
                  Front
                </button>
                <button
                  type="button"
                  onClick={() => setCameraPreset('top')}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white/10 hover:bg-white/20 text-cream-100 transition-colors"
                  title="Top-Down Plan View"
                >
                  Plan
                </button>
              </div>
            </div>

            {/* Turnkey Assurance Pill Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-cream-50 dark:bg-forest-950 border border-cream-200 dark:border-cream-200/10 text-xs">
              <div className="flex items-center gap-2 text-forest-950 dark:text-cream-100 font-semibold">
                <Layers className="w-4 h-4 text-copper-500" />
                <span>Base Guarantee: CenturyPly Club Prime 710 BWP Marine Plywood</span>
              </div>
              <span className="text-[#B57731] dark:text-copper-300 font-mono font-bold">
                100% Termite & Boiling Waterproof
              </span>
            </div>
          </div>

          {/* Right Column: Customization Controls & Live Charges */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between space-y-5">
            {/* Control Section Tabs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-cream-200 dark:border-cream-200/10 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-700 dark:text-cream-200 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-copper-500" />
                  <span>Customize 3D Finishes:</span>
                </span>
                <span className="text-[11px] text-[#B57731] dark:text-copper-300 font-mono">
                  Live Price Linked
                </span>
              </div>

              {/* Sub-Tabs: Wall / Cabinet / Floor / Light / Hardware */}
              <div className="grid grid-cols-5 gap-1 p-1 bg-cream-100 dark:bg-forest-950 rounded-xl border border-cream-200 dark:border-cream-200/10 text-center">
                {[
                  { id: 'wall', label: 'Wall' },
                  {
                    id: 'cabinet',
                    label:
                      selections.roomType === 'kitchen'
                        ? 'Kitchen'
                        : selections.roomType === 'bedroom'
                        ? 'Wardrobe'
                        : selections.roomType === 'bathroom'
                        ? 'Vanity'
                        : selections.roomType === 'office'
                        ? 'Desk'
                        : 'Cabinet'
                  },
                  { id: 'floor', label: 'Floor' },
                  { id: 'lighting', label: 'Light' },
                  { id: 'hardware', label: 'Fittings' }
                ].map((tb) => (
                  <button
                    key={tb.id}
                    type="button"
                    onClick={() => setActiveTabSection(tb.id as any)}
                    className={`py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                      activeTabSection === tb.id
                        ? 'bg-[#B57731] text-white shadow-sm'
                        : 'text-charcoal-600 dark:text-cream-300 hover:text-[#B57731]'
                    }`}
                  >
                    {tb.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Wall Finish Options */}
              {activeTabSection === 'wall' && (
                <div className="space-y-2 pt-1 animate-in fade-in duration-200">
                  <div className="text-[11px] text-charcoal-500 dark:text-charcoal-300">
                    Select focal wall treatment (paints, fluted louvers or bookmatched marble):
                  </div>
                  <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
                    {WALL_FINISHES.map((w) => {
                      const isSelected = selections.wallFinish === w.id;
                      return (
                        <div
                          key={w.id}
                          onClick={() => {
                            setSelections({ ...selections, wallFinish: w.id });
                            showToast(`Applied ${w.name} to 3D room`, 'info');
                          }}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-[#B57731] bg-copper-500/15 shadow-sm'
                              : 'border-cream-200 dark:border-cream-200/10 bg-cream-50 dark:bg-forest-950/60 hover:border-copper-400'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-7 h-7 rounded-lg shadow-sm border border-black/15 flex-shrink-0"
                              style={{ backgroundColor: w.hex }}
                            />
                            <div>
                              <div className="text-xs font-bold text-forest-950 dark:text-cream-100 flex items-center gap-1.5">
                                <span>{w.name}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#B57731]" />}
                              </div>
                              <div className="text-[10px] text-charcoal-400 truncate max-w-[170px]">
                                {w.category} • {w.brand}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#B57731] dark:text-copper-300">
                            +₹{w.cost.toLocaleString('en-IN')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 2: Cabinet Finish Options */}
              {activeTabSection === 'cabinet' && (
                <div className="space-y-2 pt-1 animate-in fade-in duration-200">
                  <div className="text-[11px] text-charcoal-500 dark:text-charcoal-300">
                    {selections.roomType === 'kitchen'
                      ? 'Select surfacing for base cabinets, overheads & breakfast island:'
                      : selections.roomType === 'bedroom'
                      ? 'Select surfacing for floor-to-ceiling wardrobe & floating nightstands:'
                      : selections.roomType === 'bathroom'
                      ? 'Select surfacing for double vanity cabinet & tall linen storage:'
                      : selections.roomType === 'office'
                      ? 'Select surfacing for director desk, return credenza & library:'
                      : 'Select surfacing for floating TV unit, credenza & storage:'}
                  </div>
                  <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
                    {CABINET_FINISHES.map((c) => {
                      const isSelected = selections.cabinetFinish === c.id;
                      return (
                        <div
                          key={c.id}
                          onClick={() => {
                            setSelections({ ...selections, cabinetFinish: c.id });
                            showToast(`Applied ${c.name} to cabinetry`, 'info');
                          }}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-[#B57731] bg-copper-500/15 shadow-sm'
                              : 'border-cream-200 dark:border-cream-200/10 bg-cream-50 dark:bg-forest-950/60 hover:border-copper-400'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-7 h-7 rounded-lg shadow-sm border border-black/15 flex-shrink-0"
                              style={{ backgroundColor: c.hex }}
                            />
                            <div>
                              <div className="text-xs font-bold text-forest-950 dark:text-cream-100 flex items-center gap-1.5">
                                <span>{c.name}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#B57731]" />}
                              </div>
                              <div className="text-[10px] text-charcoal-400 truncate max-w-[170px]">
                                {c.category} • {c.brand}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#B57731] dark:text-copper-300">
                            +₹{c.cost.toLocaleString('en-IN')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 3: Flooring Options */}
              {activeTabSection === 'floor' && (
                <div className="space-y-2 pt-1 animate-in fade-in duration-200">
                  <div className="text-[11px] text-charcoal-500 dark:text-charcoal-300">
                    Select floor surfacing (vitrified slabs, Italian marble or wood parquet):
                  </div>
                  <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
                    {FLOORING_FINISHES.map((f) => {
                      const isSelected = selections.flooring === f.id;
                      return (
                        <div
                          key={f.id}
                          onClick={() => {
                            setSelections({ ...selections, flooring: f.id });
                            showToast(`Applied ${f.name} flooring`, 'info');
                          }}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-[#B57731] bg-copper-500/15 shadow-sm'
                              : 'border-cream-200 dark:border-cream-200/10 bg-cream-50 dark:bg-forest-950/60 hover:border-copper-400'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-7 h-7 rounded-lg shadow-sm border border-black/15 flex-shrink-0"
                              style={{ backgroundColor: f.hex }}
                            />
                            <div>
                              <div className="text-xs font-bold text-forest-950 dark:text-cream-100 flex items-center gap-1.5">
                                <span>{f.name}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#B57731]" />}
                              </div>
                              <div className="text-[10px] text-charcoal-400 truncate max-w-[170px]">
                                {f.category} • {f.brand}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#B57731] dark:text-copper-300">
                            +₹{f.cost.toLocaleString('en-IN')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 4: Lighting Temperature Options */}
              {activeTabSection === 'lighting' && (
                <div className="space-y-2 pt-1 animate-in fade-in duration-200">
                  <div className="text-[11px] text-charcoal-500 dark:text-charcoal-300">
                    Select architectural false ceiling cove & spotlights color temperature:
                  </div>
                  <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
                    {LIGHTING_MOODS.map((l) => {
                      const isSelected = selections.lightingMood === l.id;
                      return (
                        <div
                          key={l.id}
                          onClick={() => {
                            setSelections({ ...selections, lightingMood: l.id as any });
                            showToast(`Set lighting temperature to ${l.name}`, 'info');
                          }}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-[#B57731] bg-copper-500/15 shadow-sm'
                              : 'border-cream-200 dark:border-cream-200/10 bg-cream-50 dark:bg-forest-950/60 hover:border-copper-400'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-black/80 flex items-center justify-center text-amber-400 shadow-sm flex-shrink-0">
                              <Sun className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-forest-950 dark:text-cream-100 flex items-center gap-1.5">
                                <span>{l.name}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#B57731]" />}
                              </div>
                              <div className="text-[10px] text-charcoal-400 truncate max-w-[170px]">
                                Philips 48V Low Voltage
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#B57731] dark:text-copper-300">
                            +₹{l.cost.toLocaleString('en-IN')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 5: Hardware Package Options */}
              {activeTabSection === 'hardware' && (
                <div className="space-y-2 pt-1 animate-in fade-in duration-200">
                  <div className="text-[11px] text-charcoal-500 dark:text-charcoal-300">
                    Select soft-close drawer runners and 3D hinges:
                  </div>
                  <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
                    {HARDWARE_PACKAGES.map((h) => {
                      const isSelected = selections.hardwarePackage === h.id;
                      return (
                        <div
                          key={h.id}
                          onClick={() => {
                            setSelections({ ...selections, hardwarePackage: h.id as any });
                            showToast(`Equipped ${h.name}`, 'info');
                          }}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-[#B57731] bg-copper-500/15 shadow-sm'
                              : 'border-cream-200 dark:border-cream-200/10 bg-cream-50 dark:bg-forest-950/60 hover:border-copper-400'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold text-forest-950 dark:text-cream-100 flex items-center gap-1.5">
                              <span>{h.name}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#B57731]" />}
                            </div>
                            <div className="text-[10px] text-charcoal-400">
                              {h.brand} • Certified Mechanism
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#B57731] dark:text-copper-300">
                            +₹{h.cost.toLocaleString('en-IN')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* LIVE TURNKEY PRICE BREAKDOWN & ESTIMATE CARD */}
            <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#131922] border border-copper-500/35 shadow-card overflow-hidden transition-all duration-300">
              
              {/* Header Strip with Live Status & Total Price */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-copper-500/10 via-amber-500/5 to-transparent border-b border-cream-200/80 dark:border-cream-200/10">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-copper-600 dark:text-copper-400">
                        Live Turnkey Estimate
                      </span>
                    </div>
                    <div className="font-serif text-2xl sm:text-3xl font-extrabold text-forest-950 dark:text-cream-50 tracking-tight flex items-baseline gap-1.5">
                      <span>{pricing.formattedTotal}</span>
                      <span className="text-[10px] sm:text-[11px] font-sans font-medium text-charcoal-400 dark:text-cream-200/50">
                        (All Inclusive)
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowItemized(!showItemized)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-forest-900 text-xs font-bold text-charcoal-700 dark:text-cream-200 border border-cream-200 dark:border-cream-200/20 shadow-sm hover:border-copper-500 transition-all cursor-pointer shrink-0 mt-0.5"
                  >
                    <span>{showItemized ? 'Hide Bill' : 'Itemized Bill'}</span>
                    {showItemized ? (
                      <ChevronUp className="w-3.5 h-3.5 text-copper-600 dark:text-copper-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-copper-600 dark:text-copper-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Itemized Bill Table (Accordion) */}
              {showItemized && (
                <div className="p-3.5 sm:p-4 bg-cream-50/70 dark:bg-forest-950/60 border-b border-cream-200/80 dark:border-cream-200/10 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-cream-200/50 pb-2 border-b border-cream-200/60 dark:border-cream-200/10">
                    <span>Component / Specification</span>
                    <span>Cost (INR)</span>
                  </div>

                  <div className="space-y-1.5 py-2.5 max-h-[190px] overflow-y-auto pr-1 text-xs">
                    {pricing.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white dark:bg-[#1A212C] border border-cream-200/50 dark:border-cream-200/5 hover:border-copper-400/40 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-copper-500 shrink-0"></span>
                          <span className="text-xs text-charcoal-700 dark:text-cream-100 font-medium truncate">
                            {item.name}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-xs text-forest-950 dark:text-cream-50 shrink-0 bg-cream-100 dark:bg-forest-900 px-2 py-0.5 rounded-md">
                          ₹{item.cost.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}

                    {/* Labor & Installation Row */}
                    <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-amber-500/10 dark:bg-copper-500/15 border border-amber-500/20 text-xs mt-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                        <span className="text-xs text-amber-900 dark:text-copper-200 font-bold truncate">
                          Certified Turnkey Labor & Fitting (18%):
                        </span>
                      </div>
                      <span className="font-mono font-extrabold text-xs text-amber-800 dark:text-copper-300 shrink-0">
                        ₹{pricing.laborAndInstallation.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons Section */}
              <div className="p-4 sm:p-5 space-y-3">
                {/* Primary CTA Button */}
                <button
                  type="button"
                  onClick={handleAddCustomRoomToQuote}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-copper-500 via-copper-600 to-copper-500 hover:from-copper-600 hover:to-copper-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-glow-copper transition-all duration-200 active:scale-[0.98] flex items-center justify-between gap-3 group cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate">
                    <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110 shrink-0" />
                    <span className="truncate">Add 3D Package to Quote</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-white/20 text-white font-mono text-xs font-bold shrink-0">
                    {pricing.formattedTotal}
                  </span>
                </button>

                {/* Secondary Actions 2-Column Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    to="/site-visit"
                    className="py-2.5 px-3 rounded-xl bg-forest-950 dark:bg-cream-100 text-white dark:text-forest-950 hover:bg-forest-900 dark:hover:bg-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 text-center"
                  >
                    <Calendar className="w-3.5 h-3.5 text-copper-400 dark:text-copper-600 shrink-0" />
                    <span>Book Site Visit</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleDownloadSummary}
                    className="py-2.5 px-3 rounded-xl bg-cream-50 dark:bg-[#1A212C] text-forest-950 dark:text-cream-100 hover:bg-cream-100 dark:hover:bg-[#222c3b] border border-cream-200 dark:border-cream-200/20 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <FileDown className="w-3.5 h-3.5 text-copper-600 dark:text-copper-400 shrink-0" />
                    <span>Download Specs</span>
                  </button>
                </div>

                {/* Trust Guarantee Strip */}
                <div className="pt-1 flex items-center justify-center gap-1.5 text-[10px] text-charcoal-400 dark:text-cream-200/50">
                  <ShieldCheck className="w-3.5 h-3.5 text-copper-500 shrink-0" />
                  <span>100% Genuine Century BWP 710 & Häfele Hardware</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
