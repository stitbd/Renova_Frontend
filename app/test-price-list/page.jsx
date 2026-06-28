"use client";

import { useState, useMemo } from "react";
import "@/styles/components/HeroSection.css";
import "@/styles/pages/test-price-list.css";
import { Search, X, Tag, SortAsc } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   RAW TEST DATA
   ═══════════════════════════════════════════════════════════════ */
const RAW_TESTS = [
  { name: "BLOOD GROUP (ABORH)",                         rate: 200,   discounted: 150  },
  { name: "ALBUMIN (serum)",                             rate: 300,   discounted: 225  },
  { name: "ALK.PHOSPHATE",                               rate: 300,   discounted: 225  },
  { name: "ALPHA FETO PROTEIN (AFP)",                    rate: 1000,  discounted: 750  },
  { name: "AMH (ANTI MULLERIAN HORMONE)",                rate: 3000,  discounted: 2250 },
  { name: "ANA/ANF",                                     rate: 1000,  discounted: 750  },
  { name: "Anti Ds DNA",                                 rate: 1300,  discounted: 975  },
  { name: "Anti CCP Anti body",                          rate: 1200,  discounted: 900  },
  { name: "Anti-HBe/HBeAb/A-HBeAg",                     rate: 1000,  discounted: 750  },
  { name: "Anti Thyroid Ab (THYROGLOBULIN MICROSOMAL)",  rate: 2200,  discounted: 1650 },
  { name: "ANTI CARDEOLIRIN AB",                         rate: 3000,  discounted: 2250 },
  { name: "ANTI PHOSPHOLIPID AB",                        rate: 2400,  discounted: 1800 },
  { name: "Anti-HCV",                                    rate: 1000,  discounted: 750  },
  { name: "AMYLASE",                                     rate: 1100,  discounted: 825  },
  { name: "ASO TITRE",                                   rate: 600,   discounted: 450  },
  { name: "B.SUGAR FASTING (FBS)",                       rate: 200,   discounted: 150  },
  { name: "B.SUGAR RANDOM (RBS)",                        rate: 200,   discounted: 150  },
  { name: "B-HCG",                                       rate: 1100,  discounted: 825  },
  { name: "BILIRUBIN (Total)",                           rate: 300,   discounted: 225  },
  { name: "Bilirubin D/I",                               rate: 500,   discounted: 375  },
  { name: "BLOOD C/S (Fan Method)",                      rate: 1500,  discounted: 1125 },
  { name: "BLOOD FILM",                                  rate: 300,   discounted: 225  },
  { name: "B/S 2HRS.ABF",                               rate: 200,   discounted: 150  },
  { name: "BONE DENSITOMETRY (BMD)",                     rate: 4000,  discounted: 3000 },
  { name: "BONE MARROW",                                 rate: 3000,  discounted: 2250 },
  { name: "COLONOSCOPY (Full)",                          rate: 7000,  discounted: 5250 },
  { name: "COLONOSCOPY (Short)",                         rate: 3500,  discounted: 2625 },
  { name: "CT ABDOMEN",                                  rate: 11000, discounted: 8250 },
  { name: "CT ANKLE JOINT",                              rate: 6000,  discounted: 4500 },
  { name: "CT BOTH HIP JT",                             rate: 5000,  discounted: 3750 },
  { name: "CT BRAIN",                                    rate: 4000,  discounted: 2500 },
  { name: "CT CERVICAL SPINE",                           rate: 6000,  discounted: 4500 },
  { name: "CT CHEST",                                    rate: 6000,  discounted: 4500 },
  { name: "CT HBS & PANCREAS",                           rate: 6500,  discounted: 4125 },
  { name: "CT KUB",                                      rate: 13000, discounted: 9750 },
  { name: "CT EAR R/L",                                  rate: 6000,  discounted: 4500 },
  { name: "CT ELBOW JOINT RT/LT.",                       rate: 6000,  discounted: 4500 },
  { name: "CT FACE",                                     rate: 6000,  discounted: 4500 },
  { name: "CT FEMUR",                                    rate: 6000,  discounted: 4500 },
  { name: "CT MASTOID",                                  rate: 6000,  discounted: 4500 },
  { name: "CT NECK",                                     rate: 5500,  discounted: 4125 },
  { name: "CT ORBIT",                                    rate: 6000,  discounted: 4500 },
  { name: "CALCIUM",                                     rate: 500,   discounted: 375  },
  { name: "DUPLEX S. RT. UPPER LIMB",                    rate: 3000,  discounted: 2250 },
  { name: "ECG",                                         rate: 400,   discounted: 300  },
  { name: "ECHOCARDIOGRAM",                              rate: 1500,  discounted: 1125 },
  { name: "ECHO COLOR DOPPLER",                          rate: 2500,  discounted: 1875 },
  { name: "EEG DIGITAL",                                 rate: 3000,  discounted: 2250 },
  { name: "ELECTROLYTES",                                rate: 850,   discounted: 638  },
  { name: "ESTRADIOL",                                   rate: 1000,  discounted: 750  },
  { name: "ETT",                                         rate: 3000,  discounted: 2250 },
  { name: "FECAL CALPROTECTIN",                          rate: 4500,  discounted: 3375 },
  { name: "FIBROSCAN WITH CAP",                          rate: 4000,  discounted: 3000 },
  { name: "FIBRO OPTIC LARYNGOSCOPY (FOL)",              rate: 2000,  discounted: 1500 },
  { name: "HVS C/S",                                     rate: 600,   discounted: 450  },
  { name: "HIV",                                         rate: 1100,  discounted: 825  },
  { name: "IgE Serum",                                   rate: 950,   discounted: 713  },
  { name: "IRON",                                        rate: 1200,  discounted: 900  },
  { name: "IRON PROFILE",                                rate: 3000,  discounted: 2250 },
  { name: "LDL",                                         rate: 400,   discounted: 300  },
  { name: "LH (Luteinizing Hormone)",                    rate: 1000,  discounted: 750  },
  { name: "LH FSH RATIO",                                rate: 2000,  discounted: 1500 },
  { name: "LIPID PROFILE",                               rate: 1200,  discounted: 900  },
  { name: "LFT (LIVER FUNCTION TEST)",                   rate: 1600,  discounted: 1200 },
  { name: "LEIPUS ANTICOAGULANT",                        rate: 5000,  discounted: 3750 },
  { name: "MULTIPLE ALLERGENS",                          rate: 9000,  discounted: 6750 },
  { name: "PAP'S SMEAR",                                 rate: 800,   discounted: 600  },
  { name: "PCR HCV RNA QUANTITATIVE (Real Time)",        rate: 10000, discounted: 7500 },
  { name: "PCR HPV DNA",                                 rate: 6500,  discounted: 4875 },
  { name: "PCR HCV RNA GENOTYPING (Real Time)",          rate: 14000, discounted: 10500},
  { name: "PCR MTB DNA",                                 rate: 6000,  discounted: 4500 },
  { name: "PCR HLA-B27",                                 rate: 4000,  discounted: 3000 },
  { name: "PCR HBV DNA QUANTITATIVE (Real Time)",        rate: 8000,  discounted: 6000 },
  { name: "PROTEIN ELECTROPHORESIS",                     rate: 1100,  discounted: 825  },
  { name: "PROLACTIN",                                   rate: 1000,  discounted: 750  },
  { name: "PROTEIN-C",                                   rate: 4000,  discounted: 3000 },
  { name: "PROTEIN-S",                                   rate: 4000,  discounted: 3000 },
  { name: "PSA",                                         rate: 1000,  discounted: 750  },
  { name: "PO4 (IN.PHOS)",                               rate: 500,   discounted: 375  },
  { name: "R/A TEST",                                    rate: 600,   discounted: 450  },
  { name: "SEMEN ANALYSIS",                              rate: 1000,  discounted: 750  },
  { name: "SERUM LIPASE",                                rate: 1000,  discounted: 750  },
  { name: "SHBG",                                        rate: 1500,  discounted: 1125 },
  { name: "SGOT (AST)",                                  rate: 500,   discounted: 375  },
  { name: "SGPT (ALT)",                                  rate: 500,   discounted: 375  },
  { name: "STOOL R/E M/E",                               rate: 150,   discounted: 113  },
  { name: "SPUTUM C/S",                                  rate: 600,   discounted: 450  },
  { name: "STOOL R/S",                                   rate: 200,   discounted: 150  },
  { name: "SPIROMETRY",                                  rate: 700,   discounted: 525  },
  { name: "SPUTUM AFB",                                  rate: 300,   discounted: 225  },
  { name: "SPUTUM GM.STAIN",                             rate: 300,   discounted: 225  },
  { name: "STOOL OBT",                                   rate: 250,   discounted: 188  },
  { name: "STOOL C/S",                                   rate: 800,   discounted: 600  },
  { name: "SKIN SCR.FUNGUS",                             rate: 300,   discounted: 225  },
  { name: "T3",                                          rate: 800,   discounted: 600  },
  { name: "T3 T4 TSH",                                   rate: 2400,  discounted: 1800 },
  { name: "T4",                                          rate: 800,   discounted: 600  },
  { name: "TB GOLD",                                     rate: 8000,  discounted: 6000 },
  { name: "TR-AB",                                       rate: 4000,  discounted: 3000 },
  { name: "AMPHETAMINE (URINE)",                         rate: 1000,  discounted: 750  },
  { name: "BENZODIAZERINE (URINE)",                      rate: 1000,  discounted: 750  },
  { name: "TIBC",                                        rate: 800,   discounted: 600  },
  { name: "TPHA (Q+Q)",                                  rate: 750,   discounted: 563  },
  { name: "T/S FOR AFB",                                 rate: 300,   discounted: 225  },
  { name: "TSH",                                         rate: 800,   discounted: 600  },
  { name: "TRIPLE ANTIGEN",                              rate: 900,   discounted: 675  },
  { name: "TROPONIN-I",                                  rate: 1000,  discounted: 750  },
  { name: "TG",                                          rate: 300,   discounted: 225  },
  { name: "Testosterone",                                rate: 1000,  discounted: 750  },
  { name: "UREA",                                        rate: 400,   discounted: 300  },
  { name: "URIC ACID",                                   rate: 500,   discounted: 375  },
  { name: "URINE 24hrs URIC ACID",                       rate: 300,   discounted: 225  },
  { name: "URINE ACETONE (KETONE BODY)",                 rate: 250,   discounted: 188  },
  { name: "URINE ALBUMIN",                               rate: 150,   discounted: 113  },
  { name: "URINE AMYLASE (24hrs)",                       rate: 800,   discounted: 600  },
  { name: "URINE AMYLASE (SPOT)",                        rate: 800,   discounted: 600  },
  { name: "URINE C/S",                                   rate: 750,   discounted: 563  },
  { name: "URINE MICRO ALBUMIN",                         rate: 800,   discounted: 600  },
  { name: "URINE OSMOLALITY",                            rate: 1000,  discounted: 750  },
  { name: "URINE OSMOLALITY 24hrs",                      rate: 1000,  discounted: 750  },
  { name: "URINE ACR",                                   rate: 900,   discounted: 675  },
  { name: "URINE P.T.",                                  rate: 250,   discounted: 188  },
  { name: "URINE PCR",                                   rate: 700,   discounted: 525  },
  { name: "URINE PH.",                                   rate: 150,   discounted: 113  },
  { name: "URINE PROTEIN (24hrs)",                       rate: 300,   discounted: 225  },
  { name: "OPIATES (URINE)",                             rate: 1000,  discounted: 750  },
  { name: "URINE R/E (Auto Analyzer)",                   rate: 250,   discounted: 188  },
  { name: "URINE SODIUM",                                rate: 300,   discounted: 225  },
  { name: "URINE SODIUM (24 HRS)",                       rate: 300,   discounted: 225  },
  { name: "URINE SUGAR",                                 rate: 150,   discounted: 113  },
  { name: "MAMMOGRAPHY BOTH SIDE",                       rate: 2000,  discounted: 1500 },
  { name: "MAMMOGRAPHY SINGLE",                          rate: 1000,  discounted: 750  },
  { name: "MRI BRAIN",                                   rate: 7000,  discounted: 5250 },
  { name: "MRI BRAIN & ORBIT",                           rate: 11000, discounted: 8250 },
  { name: "MRI BRAIN & MRA",                             rate: 11000, discounted: 8250 },
  { name: "MRI C/SPINE & MRA",                           rate: 11000, discounted: 8250 },
  { name: "MRI CERVICAL SPINE",                          rate: 7000,  discounted: 5250 },
  { name: "MRI CHEST",                                   rate: 7000,  discounted: 5250 },
  { name: "MRI DORSAL CERVICAL SPINE",                   rate: 11000, discounted: 8250 },
  { name: "MRI DORSAL LUMBER SPINE",                     rate: 11000, discounted: 8250 },
  { name: "MRI DORSAL SPINE",                            rate: 7000,  discounted: 5250 },
  { name: "MRI HIP JOINT",                               rate: 7000,  discounted: 5250 },
  { name: "MRI ORBIT",                                   rate: 7000,  discounted: 5250 },
  { name: "MRI PNS",                                     rate: 7000,  discounted: 5250 },
  { name: "MRI RT KNEE",                                 rate: 9000,  discounted: 6750 },
  { name: "MRI WRIST JOINT",                             rate: 7000,  discounted: 5250 },
  { name: "NCV BOTH UPPER LIMBS",                        rate: 6000,  discounted: 4500 },
  { name: "NCV BOTH LOWER LIMBS",                        rate: 6000,  discounted: 4500 },
  { name: "NCV CROSS LIMBS",                             rate: 6000,  discounted: 4500 },
  { name: "NCV RT LOWER LIMB",                           rate: 3000,  discounted: 2250 },
  { name: "NCV LT LOWER LIMB",                           rate: 3000,  discounted: 2250 },
  { name: "UROFLOWMETRY TEST",                           rate: 800,   discounted: 600  },
  { name: "USG HBS+KUB PELVIC ORGAN",                    rate: 2000,  discounted: 1500 },
  { name: "USG HBS+KUB 4D",                              rate: 2200,  discounted: 1660 },
  { name: "USG HBS+KUB+MCC+PVR",                         rate: 2000,  discounted: 1500 },
  { name: "USG HBS+KUB+PANCREAS",                        rate: 2000,  discounted: 1500 },
  { name: "USG LOWER ABDOMEN",                           rate: 1600,  discounted: 1200 },
  { name: "BASA2 MICROGLOBULIN",                         rate: 1000,  discounted: 750  },
  { name: "BASA1 CORTISOL MORNING",                      rate: 1000,  discounted: 750  },
  { name: "CBC",                                         rate: 400,   discounted: 400  },
  { name: "CANNABINOIDS (URINE)",                        rate: 1000,  discounted: 750  },
  { name: "CA-125",                                      rate: 1000,  discounted: 750  },
  { name: "USG PREGNANCY PROFILE",                       rate: 1600,  discounted: 1200 },
  { name: "USG FETAL ANOMALY SCAN",                      rate: 2500,  discounted: 1875 },
  { name: "USG TWIN PREGNANCY PROFILE",                  rate: 2000,  discounted: 1500 },
  { name: "USG TWIN ANOMALY SCAN",                       rate: 2500,  discounted: 1875 },
  { name: "USG ANOMALY SCAN WITH 4D",                    rate: 3000,  discounted: 2250 },
  { name: "USG PROSTATE+KUB",                            rate: 1800,  discounted: 1360 },
  { name: "USG PROSTATE+KUB 4D",                         rate: 2000,  discounted: 1500 },
  { name: "USG HBS",                                     rate: 1600,  discounted: 1200 },
  { name: "USG SCROTUM",                                 rate: 1800,  discounted: 1350 },
  { name: "USG TVS (PELVIS)",                            rate: 2000,  discounted: 1500 },
  { name: "USG TVS (PELVIS) 4D",                         rate: 2200,  discounted: 1650 },
  { name: "USG TVS OF UTERUS & AD",                      rate: 2000,  discounted: 1500 },
  { name: "USG ANOMALY SCAN",                            rate: 2500,  discounted: 1875 },
  { name: "USG UPPER ABDOMEN",                           rate: 1600,  discounted: 1200 },
  { name: "USG W/A",                                     rate: 1800,  discounted: 1350 },
  { name: "USG W/A+HBS+KUB",                             rate: 1800,  discounted: 1350 },
  { name: "USG NECK",                                    rate: 1800,  discounted: 1350 },
  { name: "USG THYROID",                                 rate: 1800,  discounted: 1350 },
  { name: "USG KUB",                                     rate: 1800,  discounted: 1350 },
  { name: "USG BREAST BOTH",                             rate: 3000,  discounted: 2250 },
  { name: "USG BREAST LT/RT",                            rate: 2000,  discounted: 1500 },
  { name: "USG KUB PROSTATE MCC PVR",                    rate: 1800,  discounted: 1350 },
  { name: "RH. ANTI. TITRE",                             rate: 700,   discounted: 525  },
  { name: "XD DENTAL OPG",                               rate: 400,   discounted: 300  },
  { name: "CA-15.3",                                     rate: 1000,  discounted: 750  },
  { name: "XD SINGLE TOOTH",                             rate: 150,   discounted: 113  },
  { name: "XD SINGLE TOOTH 2-FILM",                      rate: 250,   discounted: 188  },
  { name: "XR BARIUM SWALLOW",                           rate: 1400,  discounted: 1050 },
  { name: "XR ABDOMEN P/C DIGITAL",                      rate: 650,   discounted: 488  },
  { name: "XR CHEST P.A DIGITAL",                        rate: 450,   discounted: 338  },
  { name: "XR CHEST AP VIEW DIGITAL",                    rate: 450,   discounted: 338  },
  { name: "XR CHEST B/V DIGITAL",                        rate: 900,   discounted: 650  },
  { name: "XR D/L SPINE B/V DIGITAL",                    rate: 800,   discounted: 600  },
  { name: "XR D/L SPINE LATERAL",                        rate: 450,   discounted: 338  },
  { name: "XR IVU",                                      rate: 2400,  discounted: 1800 },
  { name: "XR KUB DIGITAL",                              rate: 600,   discounted: 450  },
  { name: "XR RGU & MCU",                                rate: 1800,  discounted: 1350 },
  { name: "XR L/S SPINE B/V DIGITAL",                    rate: 800,   discounted: 600  },
  { name: "XR LEG BOTH DIGITAL",                         rate: 1200,  discounted: 900  },
  { name: "XR KNEE RT/LT. B/V",                         rate: 450,   discounted: 338  },
  { name: "XR PNS OM VIEW",                              rate: 450,   discounted: 338  },
  { name: "XR NECK B/V",                                 rate: 800,   discounted: 600  },
  { name: "XR CERVICAL SPINE B/V",                       rate: 800,   discounted: 600  },
  { name: "XR FOOT RT/LT B/V",                           rate: 450,   discounted: 338  },
  { name: "XR LEG RT/LT B/V",                            rate: 550,   discounted: 413  },
  { name: "XR HAND LT/RT B/V",                           rate: 450,   discounted: 338  },
  { name: "VDRL",                                        rate: 500,   discounted: 375  },
  { name: "WIDAL",                                       rate: 450,   discounted: 338  },
  { name: "CA-19.9",                                     rate: 1000,  discounted: 750  },
  { name: "CEA",                                         rate: 1000,  discounted: 750  },
  { name: "ENA PRODILE",                                 rate: 1000,  discounted: 750  },
  { name: "FACTOR-8",                                    rate: 1000,  discounted: 750  },
  { name: "FACTOR-9",                                    rate: 1000,  discounted: 750  },
  { name: "FREE TESTOSTERONE",                           rate: 1200,  discounted: 900  },
];

/* ═══════════════════════════════════════════════════════════════
   CATEGORY MAP — tag each test
   ═══════════════════════════════════════════════════════════════ */
const CATEGORY_MAP = [
  { key: "blood",       label: "Blood Tests",       emoji: "🩸", match: /blood|sugar|fbs|rbs|hba1c|cbc|film|b-hcg|bilirubin|albumin|calcium|electrolyte|iron|tibc|ldl|lipid|lft|urea|uric|sgot|sgpt|ast|alt|alk|amylase|troponin|tg|triglyc/i },
  { key: "imaging",     label: "Imaging & Radiology", emoji: "🖼️", match: /ct |mri |xr |xd |mammog|densito|duplex|fibroscan/i },
  { key: "usg",         label: "Ultrasound (USG)",   emoji: "🔊", match: /^usg|uroflow/i },
  { key: "urine",       label: "Urine & Stool",     emoji: "🧪", match: /^urine|^stool|^sputum|^skin scr|^opiates|cannabinoid|amphet|benzo/i },
  { key: "hormone",     label: "Hormones & Tumour Markers", emoji: "🔬", match: /tsh|t3|t4|prolactin|estradiol|testosterone|lh |fsh|shbg|amh|psa|ca-125|ca-15|ca-19|cea|afp|hcg|basa|cortisol|tb gold|tr-ab/i },
  { key: "immunology",  label: "Immunology & Infection", emoji: "🛡️", match: /hiv|hbs|hcv|hbe|anti-|ana|aso|pcr |hla|widal|vdrl|tpha|ra test|r\/a|igE|factor|ena|protein-c|protein-s|anti |ige|factor-|protein elec/i },
  { key: "cardiology",  label: "Cardiology",         emoji: "❤️", match: /ecg|echo|ett|lipid/i },
  { key: "neurology",   label: "Neurology",          emoji: "🧠", match: /ncv|eeg/i },
  { key: "procedure",   label: "Procedures & Scope", emoji: "🏥", match: /colonoscopy|laryngoscopy|pap|bone marrow|spirometry/i },
];

const ALL_KEY = "all";

function getCategory(testName) {
  for (const cat of CATEGORY_MAP) {
    if (cat.match.test(testName)) return cat.key;
  }
  return "blood"; // fallback
}

const TESTS = RAW_TESTS.map((t, i) => ({
  ...t,
  id: i,
  category: getCategory(t.name),
  savings: t.rate - t.discounted,
  savingsPct: Math.round(((t.rate - t.discounted) / t.rate) * 100),
}));

const CATEGORIES = [
  { key: ALL_KEY, label: "All Tests", emoji: "🔭" },
  ...CATEGORY_MAP,
];

/* ═══════════════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════════════ */
const IconSearch = () => <Search size={16} strokeWidth={2} />;
const IconX = () => <X size={14} strokeWidth={2.5} />;
const IconTag = () => <Tag size={11} strokeWidth={2} />;
const IconSort = () => <SortAsc size={15} strokeWidth={2} />;

/* ═══════════════════════════════════════════════════════════════
   MOBILE TEST CARD
   ═══════════════════════════════════════════════════════════════ */
function MobileTestCard({ test, idx }) {
  const catData = CATEGORY_MAP.find(c => c.key === test.category);
  return (
    <div className="tpl-mcard">
      <div className="tpl-mcard__top">
        <span className="tpl-mcard__serial">#{idx + 1}</span>
        <span className="tpl-mcard__cat">
          <span aria-hidden="true">{catData?.emoji}</span>
          {catData?.label}
        </span>
        {test.savings > 0 && (
          <span className="tpl-mcard__save-pill">{test.savingsPct}% OFF</span>
        )}
      </div>
      <h3 className="tpl-mcard__name">{test.name}</h3>
      <div className="tpl-mcard__prices">
        <div className="tpl-mcard__price-col tpl-mcard__price-col--disc">
          <span className="tpl-mcard__price-lbl">Discounted</span>
          <span className="tpl-mcard__price-val">৳ {test.discounted.toLocaleString()}</span>
        </div>
        <div className="tpl-mcard__divider" />
        <div className="tpl-mcard__price-col">
          <span className="tpl-mcard__price-lbl">Regular</span>
          <span className="tpl-mcard__price-val tpl-mcard__price-val--strike">৳ {test.rate.toLocaleString()}</span>
        </div>
        {test.savings > 0 && (
          <>
            <div className="tpl-mcard__divider" />
            <div className="tpl-mcard__price-col">
              <span className="tpl-mcard__price-lbl">You Save</span>
              <span className="tpl-mcard__price-val tpl-mcard__price-val--save">৳ {test.savings.toLocaleString()}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function TestPriceListPage() {
  const [query, setQuery]           = useState("");
  const [activeCategory, setActive] = useState(ALL_KEY);
  const [sort, setSort]             = useState("name");

  const filtered = useMemo(() => {
    let list = TESTS;
    if (activeCategory !== ALL_KEY) list = list.filter(t => t.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(t => t.name.toLowerCase().includes(q));
    }
    switch (sort) {
      case "price-asc":  return [...list].sort((a, b) => a.discounted - b.discounted);
      case "price-desc": return [...list].sort((a, b) => b.discounted - a.discounted);
      case "savings":    return [...list].sort((a, b) => b.savings - a.savings);
      default:           return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [query, activeCategory, sort]);

  const totalTests    = TESTS.length;
  const totalShowing  = filtered.length;
  const activeCatData = CATEGORIES.find(c => c.key === activeCategory);

  return (
    <>
      {/* ══ PAGE HERO ════════════════════════════════════════ */}
      <section className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__label">Diagnostics</span>
          <h1 className="page-hero__title">
            Test <span className="page-hero__highlight">Price List</span>
          </h1>
          <p className="page-hero__subtitle">
            All prices in BDT. Enjoy up to 25% discount on {totalTests}+ investigations.
          </p>
          <nav aria-label="Breadcrumb" className="page-hero__breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Test Price List</span>
          </nav>
        </div>
      </section>

      {/* ══ STATS BAR ════════════════════════════════════════ */}
      <div className="tpl-stats-bar">
        <div className="tpl-stats-bar__inner">
          <div className="tpl-stat">
            <span className="tpl-stat__val">{totalTests}+</span>
            <span className="tpl-stat__lbl">Investigations</span>
          </div>
          <div className="tpl-stat-divider" />
          <div className="tpl-stat">
            <span className="tpl-stat__val">25%</span>
            <span className="tpl-stat__lbl">Flat Discount</span>
          </div>
          <div className="tpl-stat-divider" />
          <div className="tpl-stat">
            <span className="tpl-stat__val">{CATEGORY_MAP.length}</span>
            <span className="tpl-stat__lbl">Categories</span>
          </div>
          <div className="tpl-stat-divider" />
          <div className="tpl-stat">
            <span className="tpl-stat__val tpl-stat__val--green">BMDC</span>
            <span className="tpl-stat__lbl">Certified Lab</span>
          </div>
        </div>
      </div>

      {/* ══ MAIN ═════════════════════════════════════════════ */}
      <section className="page-section">
        <div className="page-section__container">

          {/* Discount notice */}
          <div className="tpl-notice">
            <span className="tpl-notice__icon">🎉</span>
            <p className="tpl-notice__text">
              All listed prices include a <strong>25% special discount</strong>. Show this page at the reception to avail the offer.
            </p>
          </div>

          {/* Toolbar */}
          <div className="tpl-toolbar">
            <div className="tpl-search-wrap">
              <span className="tpl-search-ico"><IconSearch /></span>
              <input
                className="tpl-search"
                type="text"
                placeholder="Search test name…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                aria-label="Search tests"
              />
              {query && (
                <button className="tpl-search-clear" onClick={() => setQuery("")} aria-label="Clear search">
                  <IconX />
                </button>
              )}
            </div>
            <div className="tpl-sort-wrap">
              <span className="tpl-sort-ico"><IconSort /></span>
              <select
                className="tpl-sort"
                value={sort}
                onChange={e => setSort(e.target.value)}
                aria-label="Sort tests"
              >
                <option value="name">Sort: A–Z</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="savings">Most Savings</option>
              </select>
            </div>
          </div>

          {/* Category tabs */}
          <div className="tpl-tabs" role="tablist" aria-label="Test categories">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                role="tab"
                aria-selected={activeCategory === cat.key}
                className={`tpl-tab${activeCategory === cat.key ? " tpl-tab--active" : ""}`}
                onClick={() => { setActive(cat.key); setQuery(""); }}
              >
                <span className="tpl-tab__emoji" aria-hidden="true">{cat.emoji}</span>
                <span className="tpl-tab__label">{cat.label}</span>
                {activeCategory === cat.key && (
                  <span className="tpl-tab__count">
                    {cat.key === ALL_KEY ? totalTests : TESTS.filter(t => t.category === cat.key).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Result meta */}
          <div className="tpl-result-meta">
            {query
              ? <><span className="tpl-result-meta__count">{totalShowing}</span> result{totalShowing !== 1 ? "s" : ""} for <em>"{query}"</em></>
              : <><span className="tpl-result-meta__count">{totalShowing}</span> tests in <strong>{activeCatData?.label}</strong></>
            }
          </div>

          {/* Empty state */}
          {filtered.length === 0 ? (
            <div className="tpl-empty">
              <span className="tpl-empty__icon">🔍</span>
              <p className="tpl-empty__title">No tests found</p>
              <p className="tpl-empty__sub">Try a different keyword or browse all categories.</p>
              <button className="btn btn-secondary" onClick={() => { setQuery(""); setActive(ALL_KEY); }}>
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {/* ── DESKTOP: Table (hidden on mobile) ──────── */}
              <div className="tpl-table-wrap tpl-desktop-only">
                <table className="tpl-table" role="table" aria-label="Test price list">
                  <thead>
                    <tr>
                      <th className="tpl-th tpl-th--num">#</th>
                      <th className="tpl-th">Investigation Name</th>
                      <th className="tpl-th tpl-th--center">
                        Regular Rate
                        <span className="tpl-th__unit">(BDT)</span>
                      </th>
                      <th className="tpl-th tpl-th--center tpl-th--disc">
                        Discounted
                        <span className="tpl-th__unit">(BDT)</span>
                      </th>
                      <th className="tpl-th tpl-th--center">You Save</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((test, idx) => (
                      <tr key={test.id} className={`tpl-row${idx % 2 === 0 ? " tpl-row--even" : ""}`}>
                        <td className="tpl-td tpl-td--num">{idx + 1}</td>
                        <td className="tpl-td tpl-td--name">
                          <span className="tpl-test-name">{test.name}</span>
                          <span className="tpl-cat-tag">
                            <IconTag />
                            {CATEGORY_MAP.find(c => c.key === test.category)?.label || ""}
                          </span>
                        </td>
                        <td className="tpl-td tpl-td--center tpl-td--rate">
                          {test.rate.toLocaleString()}
                        </td>
                        <td className="tpl-td tpl-td--center tpl-td--disc">
                          <span className="tpl-disc-price">{test.discounted.toLocaleString()}</span>
                        </td>
                        <td className="tpl-td tpl-td--center">
                          {test.savings > 0 ? (
                            <span className="tpl-savings-badge">
                              {test.savings.toLocaleString()} ({test.savingsPct}%)
                            </span>
                          ) : (
                            <span className="tpl-no-savings">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── MOBILE: Cards (hidden on desktop) ──────── */}
              <div className="tpl-cards-grid tpl-mobile-only">
                {filtered.map((test, idx) => (
                  <MobileTestCard key={test.id} test={test} idx={idx} />
                ))}
              </div>
            </>
          )}

          {/* Footer note */}
          <p className="tpl-footer-note">
            * Prices are subject to change without prior notice. Please confirm at the reception before booking.
            For corporate health packages, <a href="/contact">contact us</a>.
          </p>
        </div>
      </section>
    </>
  );
}