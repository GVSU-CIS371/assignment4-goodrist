import { defineStore } from "pinia";
import {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  BeverageType,
} from "../types/beverage";

import tempretures from "../data/tempretures.json";
import { db } from "../firebase";

import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

// A beverage returned from Firestore includes an ID
type BeverageWithID = BeverageType & { id: string };

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures,
    currentTemp: tempretures[0],

    bases: [] as BaseBeverageType[],
    currentBase: null as BaseBeverageType | null,

    syrups: [] as SyrupType[],
    currentSyrup: null as SyrupType | null,

    creamers: [] as CreamerType[],
    currentCreamer: null as CreamerType | null,

    beverages: [] as BeverageWithID[],
    currentBeverage: null as BeverageWithID | null,

    currentName: "",
  }),

  actions: {
    // ----------------------------------------------------
    // INIT — Load Firestore Data + Set Defaults
    // ----------------------------------------------------
    async init() {
      // Load bases
      const baseSnap = await getDocs(collection(db, "bases"));
      this.bases = baseSnap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<BaseBeverageType, "id">),
      }));

      // Load creamers
      const creamerSnap = await getDocs(collection(db, "creamers"));
      this.creamers = creamerSnap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<CreamerType, "id">),
      }));

      // Load syrups
      const syrupSnap = await getDocs(collection(db, "syrups"));
      this.syrups = syrupSnap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<SyrupType, "id">),
      }));

      // Set defaults
      this.currentBase = this.bases[0] || null;
      this.currentCreamer = this.creamers[0] || null;
      this.currentSyrup = this.syrups[0] || null;

      // Load beverages
      const bevSnap = await getDocs(collection(db, "beverages"));
      this.beverages = bevSnap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<BeverageType, "id">),
      }));
    },

    // ----------------------------------------------------
    // MAKE BEVERAGE — Save to Firestore
    // ----------------------------------------------------
    async makeBeverage() {
      if (!this.currentBase || !this.currentCreamer || !this.currentSyrup) {
        console.error("Missing selections!");
        return;
      }

      // Firestore stores everything EXCEPT id
      const newBeverage: Omit<BeverageType, "id"> = {
        name: this.currentName || "Unnamed Beverage",
        temp: this.currentTemp,
        base: this.currentBase,
        syrup: this.currentSyrup,
        creamer: this.currentCreamer,
      };

      // Save to Firestore
      const docRef = await addDoc(collection(db, "beverages"), newBeverage);

      // Push into local state with generated Firestore ID
      this.beverages.push({
        id: docRef.id,
        ...newBeverage,
      });

      // Reset the input field
      this.currentName = "";
    },

    // ----------------------------------------------------
    // SHOW BEVERAGE — Load a saved one into the mug
    // ----------------------------------------------------
    showBeverage(bev: BeverageWithID) {
      this.currentBeverage = bev;

      this.currentName = bev.name;
      this.currentTemp = bev.temp;

      this.currentBase = bev.base;
      this.currentCreamer = bev.creamer;
      this.currentSyrup = bev.syrup;
    },
  },
});
