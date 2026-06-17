// import { useState, useEffect } from "react";
// import { 
//   Plus, Trash2, Save, Printer, History, X, 
//   Menu, Diamond, Phone, Mail, User, 
//   Calculator as CalcIcon, Sparkles, ChevronDown,
//   ArrowRight, Star, CircleDollarSign, Scale,
//   Gem, Pin, Weight, Coins, Percent, 
//   Tag, IdCard, Scroll, Inbox,
//   Clock, Pen, File, Calendar, 
//   Wrench, Briefcase
// } from "lucide-react";

// export default function Calculator() {
//   // Main calculator state
//   const [metal, setMetal] = useState("Gold");
//   const [weight, setWeight] = useState("");
//   const [rate, setRate] = useState("");
//   const [labourType, setLabourType] = useState("percentage");
//   const [labourValue, setLabourValue] = useState("");
//   const [stone, setStone] = useState("");
//   const [hallmark, setHallmark] = useState("");
//   const [discount, setDiscount] = useState("");
//   const [gst, setGst] = useState(3);
//   const [karat, setKarat] = useState("24");

//   // Customer details
//   const [customerName, setCustomerName] = useState("");
//   const [customerPhone, setCustomerPhone] = useState("");
//   const [staffName, setStaffName] = useState("");
//   const [quotationNote, setQuotationNote] = useState("");

//   // Saved quotations
//   const [savedQuotations, setSavedQuotations] = useState([]);
//   const [showHistory, setShowHistory] = useState(false);
//   const [editingQuotationId, setEditingQuotationId] = useState(null);

//   // Gold karat rates (relative to 24K)
//   const goldKaratRates = {
//     "24": 1.000,
//     "22": 0.92,
//     "20": 0.84,
//     "18": 0.750,
//     "14": 0.585,
//     "10": 0.417,
//     "9": 0.375
//   };

//   // Silver purity rates (relative to 99.9%)
//   const silverPurityRates = {
//     "99.9": 1.000,
//     "99.5": 0.995,
//     "98": 0.980,
//     "96": 0.960,
//     "92.5": 0.925,
//     "90": 0.900,
//     "80": 0.800
//   };

//   // Get current karat/purity rates based on metal
//   const getKaratOptions = () => {
//     if (metal === "Gold") {
//       return Object.keys(goldKaratRates);
//     } else if (metal === "Silver") {
//       return Object.keys(silverPurityRates);
//     } else {
//       return ["999", "950", "900", "850"];
//     }
//   };

//   const getKaratRate = () => {
//     if (metal === "Gold") {
//       return goldKaratRates[karat] || 1;
//     } else if (metal === "Silver") {
//       return silverPurityRates[karat] || 1;
//     } else {
//       return 1;
//     }
//   };

//   // Load saved quotations from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem("jewelleryQuotations");
//     if (saved) {
//       setSavedQuotations(JSON.parse(saved));
//     }
//   }, []);

//   // Save to localStorage whenever quotations change
//   useEffect(() => {
//     localStorage.setItem("jewelleryQuotations", JSON.stringify(savedQuotations));
//   }, [savedQuotations]);

//   // Calculations with karat adjustment
//   const metalValue = Number(weight) * Number(rate) * getKaratRate();
//   const labour =
//     labourType === "percentage"
//       ? (metalValue * Number(labourValue)) / 100
//       : Number(weight) * Number(labourValue);
  
//   // Other charges combined (stone + hallmark)
//   const otherCharges = Number(stone) + Number(hallmark);
  
//   const subtotal = metalValue + labour + otherCharges - Number(discount);
//   const gstAmount = (subtotal * Number(gst)) / 100;
//   const total = subtotal + gstAmount;

//   // Generate unique ID
//   const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

//   // Save quotation
//   const saveQuotation = () => {
//     if (!customerName || !customerPhone) {
//       alert("Please fill in customer name and phone number");
//       return;
//     }

//     const quotation = {
//       id: editingQuotationId || generateId(),
//       date: new Date().toLocaleString(),
//       customerName,
//       customerPhone,
//       staffName,
//       quotationNote,
//       metal,
//       karat,
//       weight,
//       rate,
//       labourType,
//       labourValue,
//       stone,
//       hallmark,
//       discount,
//       gst,
//       metalValue,
//       labour,
//       stoneCost: Number(stone),
//       hallmarkCost: Number(hallmark),
//       otherCharges,
//       discountAmount: Number(discount),
//       gstAmount,
//       total,
//       subtotal
//     };

//     if (editingQuotationId) {
//       setSavedQuotations(prev =>
//         prev.map(q => q.id === editingQuotationId ? quotation : q)
//       );
//       setEditingQuotationId(null);
//     } else {
//       setSavedQuotations(prev => [...prev, quotation]);
//     }

//     alert("Quotation saved successfully!");
//     resetForm();
//   };

//   // Load quotation for editing
//   const loadQuotation = (quotation) => {
//     setMetal(quotation.metal);
//     setKarat(quotation.karat || "24");
//     setWeight(quotation.weight);
//     setRate(quotation.rate);
//     setLabourType(quotation.labourType);
//     setLabourValue(quotation.labourValue);
//     setStone(quotation.stone);
//     setHallmark(quotation.hallmark);
//     setDiscount(quotation.discount);
//     setGst(quotation.gst);
//     setCustomerName(quotation.customerName);
//     setCustomerPhone(quotation.customerPhone);
//     setStaffName(quotation.staffName || "");
//     setQuotationNote(quotation.quotationNote || "");
//     setEditingQuotationId(quotation.id);
//     setShowHistory(false);
//   };

//   // Delete quotation
//   const deleteQuotation = (id) => {
//     if (window.confirm("Are you sure you want to delete this quotation?")) {
//       setSavedQuotations(prev => prev.filter(q => q.id !== id));
//     }
//   };

//   // Reset form
//   const resetForm = () => {
//     setWeight("");
//     setRate("");
//     setLabourValue("");
//     setStone("");
//     setHallmark("");
//     setDiscount("");
//     setCustomerName("");
//     setCustomerPhone("");
//     setStaffName("");
//     setQuotationNote("");
//     setEditingQuotationId(null);
//   };

//   // Print quotation
//   const printQuotation = (quotation) => {
//     alert(`Printing quotation for ${quotation.customerName}`);
//   };

//   // Toggle labour type
//   const toggleLabourType = () => {
//     setLabourType(labourType === "percentage" ? "gram" : "percentage");
//     setLabourValue("");
//   };

//   return (
//     <div className="min-h-screen bg-[#EEEEEE] text-gray-800 font-sans antialiased">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
//         {/* Header with Forest Green Theme */}
//         <div className="bg-gradient-to-br from-[#1F6F5F] to-[#2FA084] rounded-3xl p-5 sm:p-7 mb-8 shadow-xl">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-5">
//             <div className="flex items-center gap-4 w-full md:w-auto">
//               <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-2xl">
//                 <img src="/SSJ2.png" alt="Suvarna Shilpi Logo" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
//               </div>
//               <div>
//                 <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
//                   Suvarna Shilpi
//                   <Sparkles className="w-5 h-5 text-[#6FCF97]" />
//                 </h1>
//                 <p className="text-xs text-white/80 font-light tracking-widest uppercase flex items-center gap-1">
//                   <span className="text-[#6FCF97]">✦</span> premium jewellery calculator
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => setShowHistory(!showHistory)}
//               className="w-full md:w-auto flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-2xl transition-all duration-300 border border-white/20 text-sm font-medium"
//             >
//               <Clock className="w-4 h-4" />
//               {showHistory ? "Hide History" : "View History"}
//               <ChevronDown className={`w-3 h-3 ml-1 opacity-60 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
//             </button>
//           </div>
//         </div>

//         {/* History Panel - Table View */}
//         {showHistory && (
//           <div className="bg-white rounded-3xl p-5 sm:p-7 mb-8 shadow-lg border border-[#6FCF97]/20 overflow-x-auto">
//             <div className="flex items-center justify-between mb-5">
//               <h2 className="text-xl font-semibold text-[#1F6F5F] flex items-center gap-3">
//                 <Scroll className="w-5 h-5 text-[#2FA084]" />
//                 Quotation History
//               </h2>
//               <span className="text-xs text-[#2FA084] bg-[#6FCF97]/10 px-3 py-1 rounded-full border border-[#6FCF97]/20">
//                 <File className="w-3 h-3 inline mr-1" />
//                 {savedQuotations.length} Records
//               </span>
//             </div>

//             {savedQuotations.length === 0 ? (
//               <div className="text-center py-12 text-gray-400">
//                 <Inbox className="w-12 h-12 text-[#6FCF97]/30 mx-auto mb-3" />
//                 <p className="text-sm">No quotations saved yet</p>
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead>
//                     <tr className="bg-gradient-to-r from-[#1F6F5F] to-[#2FA084] text-white">
//                       <th className="px-4 py-3 text-left rounded-tl-xl">#</th>
//                       <th className="px-4 py-3 text-left">Date</th>
//                       <th className="px-4 py-3 text-left">Customer</th>
//                       <th className="px-4 py-3 text-left">Phone</th>
//                       <th className="px-4 py-3 text-left">Staff</th>
//                       <th className="px-4 py-3 text-left">Metal</th>
//                       <th className="px-4 py-3 text-left">Karat</th>
//                       <th className="px-4 py-3 text-left">Weight</th>
//                       <th className="px-4 py-3 text-left">Total (₹)</th>
//                       <th className="px-4 py-3 text-center rounded-tr-xl">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {savedQuotations.map((q, index) => (
//                       <tr 
//                         key={q.id} 
//                         className={`border-b border-[#6FCF97]/10 hover:bg-[#6FCF97]/5 transition-colors ${
//                           index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
//                         }`}
//                       >
//                         <td className="px-4 py-3 text-gray-500">{index + 1}</td>
//                         <td className="px-4 py-3 text-gray-600 text-xs">{q.date}</td>
//                         <td className="px-4 py-3 font-medium text-gray-800">{q.customerName}</td>
//                         <td className="px-4 py-3 text-gray-600">{q.customerPhone}</td>
//                         <td className="px-4 py-3 text-gray-600">{q.staffName || '-'}</td>
//                         <td className="px-4 py-3">
//                           <span className="px-2 py-1 bg-[#6FCF97]/10 text-[#1F6F5F] rounded-full text-xs font-medium">
//                             {q.metal}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3 text-gray-600">{q.karat}{q.metal === "Gold" ? "K" : "%"}</td>
//                         <td className="px-4 py-3 text-gray-600">{q.weight}g</td>
//                         <td className="px-4 py-3 font-semibold text-[#1F6F5F]">₹{Number(q.total).toFixed(2)}</td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center justify-center gap-2">
//                             <button
//                               onClick={() => loadQuotation(q)}
//                               className="bg-[#2FA084] hover:bg-[#1F6F5F] text-white p-1.5 rounded-lg transition-all duration-300"
//                               title="Edit"
//                             >
//                               <Pen className="w-3.5 h-3.5" />
//                             </button>
//                             <button
//                               onClick={() => printQuotation(q)}
//                               className="bg-[#6FCF97] hover:bg-[#2FA084] text-white p-1.5 rounded-lg transition-all duration-300"
//                               title="Print"
//                             >
//                               <Printer className="w-3.5 h-3.5" />
//                             </button>
//                             <button
//                               onClick={() => deleteQuotation(q.id)}
//                               className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg transition-all duration-300"
//                               title="Delete"
//                             >
//                               <Trash2 className="w-3.5 h-3.5" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Main Grid */}
//         <div className="grid lg:grid-cols-12 gap-6">
//           {/* Left Panel - Inputs */}
//           <div className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-7 shadow-lg border border-[#6FCF97]/20">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {/* Customer Section */}
//               <div className="md:col-span-2 bg-gray-50 rounded-2xl p-5 border border-[#6FCF97]/10">
//                 <h3 className="text-[#1F6F5F] font-semibold text-sm flex items-center gap-2 mb-4">
//                   <IdCard className="w-4 h-4 text-[#2FA084]" />
//                   Customer & Staff Details
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
//                       <User className="w-3 h-3 text-[#2FA084]" /> Customer Name *
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
//                       placeholder="Customer name"
//                       value={customerName}
//                       onChange={(e) => setCustomerName(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
//                       <Phone className="w-3 h-3 text-[#2FA084]" /> Phone Number *
//                     </label>
//                     <input
//                       type="tel"
//                       className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
//                       placeholder="Phone number"
//                       value={customerPhone}
//                       onChange={(e) => setCustomerPhone(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
//                       <Briefcase className="w-3 h-3 text-[#2FA084]" /> Staff Name
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
//                       placeholder="Staff name"
//                       value={staffName}
//                       onChange={(e) => setStaffName(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
//                       <Pen className="w-3 h-3 text-[#2FA084]" /> Notes
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
//                       placeholder="Additional notes..."
//                       value={quotationNote}
//                       onChange={(e) => setQuotationNote(e.target.value)}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Left Column - Product Details */}
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
//                     <Diamond className="w-3 h-3 text-[#2FA084]" /> Metal Type
//                   </label>
//                   <select
//                     className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
//                     value={metal}
//                     onChange={(e) => {
//                       setMetal(e.target.value);
//                       setKarat(e.target.value === "Gold" ? "24" : "99.9");
//                     }}
//                   >
//                     <option value="Gold">Gold</option>
//                     <option value="Silver">Silver</option>
//                     <option value="Platinum">Platinum</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
//                     <Scale className="w-3 h-3 text-[#2FA084]" /> Karat / Purity
//                   </label>
//                   <select
//                     className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
//                     value={karat}
//                     onChange={(e) => setKarat(e.target.value)}
//                   >
//                     {getKaratOptions().map((k) => (
//                       <option key={k} value={k}>
//                         {k}{metal === "Gold" ? "K" : "%"}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
//                     <Weight className="w-3 h-3 text-[#2FA084]" /> Weight (grams)
//                   </label>
//                   <input
//                     type="number"
//                     className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
//                     placeholder="0.00"
//                     value={weight}
//                     onChange={(e) => setWeight(e.target.value)}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
//                     <Coins className="w-3 h-3 text-[#2FA084]" /> Rate Per Gram (₹)
//                   </label>
//                   <input
//                     type="number"
//                     className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
//                     placeholder="24K rate"
//                     value={rate}
//                     onChange={(e) => setRate(e.target.value)}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
//                     <Wrench className="w-3 h-3 text-[#2FA084]" /> Labour Method
//                   </label>
//                   <button
//                     onClick={toggleLabourType}
//                     className="w-full mt-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 hover:bg-[#6FCF97]/10 transition-all duration-300 flex items-center justify-center gap-2"
//                   >
//                     {labourType === "percentage" ? (
//                       <Percent className="w-4 h-4" />
//                     ) : (
//                       <Weight className="w-4 h-4" />
//                     )}
//                     {labourType === "percentage" ? "Percentage" : "Per Gram"}
//                   </button>
//                 </div>

//                 <div>
//                   <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
//                     <Gem className="w-3 h-3 text-[#2FA084]" />
//                     {labourType === "percentage" ? "Labour (%)" : "Labour Per Gram (₹)"}
//                   </label>
//                   <input
//                     type="number"
//                     className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
//                     placeholder={labourType === "percentage" ? "Enter percentage" : "Enter per gram rate"}
//                     value={labourValue}
//                     onChange={(e) => setLabourValue(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* Right Column - Additional Costs */}
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
//                     <Gem className="w-3 h-3 text-[#2FA084]" /> Stone Cost (₹)
//                   </label>
//                   <input
//                     type="number"
//                     className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
//                     placeholder="0.00"
//                     value={stone}
//                     onChange={(e) => setStone(e.target.value)}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
//                     <Pin className="w-3 h-3 text-[#2FA084]" /> Hallmark Charge (₹)
//                   </label>
//                   <input
//                     type="number"
//                     className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
//                     placeholder="0.00"
//                     value={hallmark}
//                     onChange={(e) => setHallmark(e.target.value)}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
//                     <Tag className="w-3 h-3 text-[#2FA084]" /> Discount (₹)
//                   </label>
//                   <input
//                     type="number"
//                     className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
//                     placeholder="0.00"
//                     value={discount}
//                     onChange={(e) => setDiscount(e.target.value)}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
//                     <Percent className="w-3 h-3 text-[#2FA084]" /> GST (%)
//                   </label>
//                   <input
//                     type="number"
//                     className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
//                     value={gst}
//                     onChange={(e) => setGst(e.target.value)}
//                   />
//                 </div>

//                 <div className="flex flex-col gap-2.5 pt-2">
//                   <button
//                     onClick={saveQuotation}
//                     className="w-full bg-gradient-to-r from-[#2FA084] to-[#1F6F5F] text-white font-semibold px-5 py-3 rounded-2xl shadow-lg shadow-[#2FA084]/30 hover:shadow-[#2FA084]/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm hover:scale-[1.02]"
//                   >
//                     {editingQuotationId ? <Pen className="w-4 h-4" /> : <Save className="w-4 h-4" />}
//                     {editingQuotationId ? "Update Quotation" : "Save Quotation"}
//                   </button>
//                   {editingQuotationId && (
//                     <button
//                       onClick={resetForm}
//                       className="w-full bg-gray-100 border border-gray-200 text-gray-600 px-5 py-2.5 rounded-2xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
//                     >
//                       <X className="w-4 h-4" />
//                       Cancel Edit
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Panel - Summary with Detailed Breakdown */}
//           <div className="lg:col-span-4">
//             <div className="bg-white rounded-3xl p-5 sm:p-7 sticky top-6 shadow-lg border border-[#6FCF97]/20">
//               <h2 className="text-xl font-semibold text-[#1F6F5F] flex items-center gap-3 mb-6">
//                 <CalcIcon className="w-5 h-5 text-[#2FA084]" />
//                 Summary
//               </h2>

//               <div className="space-y-3 text-sm">
//                 {/* Metal Amount */}
//                 <div className="bg-gray-50 rounded-xl p-3 border border-[#6FCF97]/10">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">💰 Metal Amount</span>
//                     <span className="font-mono text-[#1F6F5F] font-semibold">₹{metalValue.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-xs text-gray-400 mt-1">
//                     <span>{weight || 0}g × ₹{rate || 0} × {getKaratRate() * 100}% purity</span>
//                     <span>{karat}{metal === "Gold" ? "K" : "%"}</span>
//                   </div>
//                 </div>

//                 {/* Labour with detailed breakdown */}
//                 <div className="bg-gray-50 rounded-xl p-3 border border-[#6FCF97]/10">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">🔧 Labour</span>
//                     <span className="font-mono text-[#1F6F5F] font-semibold">₹{labour.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-xs text-gray-400 mt-1">
//                     {labourType === "percentage" ? (
//                       <>
//                         <span>{labourValue || 0}% of metal value</span>
//                         <span>{metalValue ? ((labour / metalValue) * 100).toFixed(1) : 0}%</span>
//                       </>
//                     ) : (
//                       <>
//                         <span>₹{labourValue || 0}/g × {weight || 0}g</span>
//                         <span>{metalValue ? ((labour / metalValue) * 100).toFixed(1) : 0}% of metal</span>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 {/* Other Charges (Stone + Hallmark combined) */}
//                 <div className="bg-gray-50 rounded-xl p-3 border border-[#6FCF97]/10">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">💎 Other Charges</span>
//                     <span className="font-mono text-[#1F6F5F] font-semibold">₹{otherCharges.toFixed(2)}</span>
//                   </div>
//                   <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-1">
//                     {Number(stone) > 0 && <span>Stone: ₹{Number(stone).toFixed(2)}</span>}
//                     {Number(hallmark) > 0 && <span>Hallmark: ₹{Number(hallmark).toFixed(2)}</span>}
//                     {!Number(stone) && !Number(hallmark) && <span>No additional charges</span>}
//                   </div>
//                 </div>

//                 {/* Discount */}
//                 {Number(discount) > 0 && (
//                   <div className="bg-red-50 rounded-xl p-3 border border-red-200">
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-600">🎯 Discount</span>
//                       <span className="font-mono text-red-500 font-semibold">-₹{Number(discount).toFixed(2)}</span>
//                     </div>
//                   </div>
//                 )}

//                 {/* Subtotal */}
//                 <div className="bg-gray-50 rounded-xl p-3 border border-[#6FCF97]/10">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Subtotal</span>
//                     <span className="font-mono text-gray-700">₹{subtotal.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 {/* GST */}
//                 <div className="bg-gray-50 rounded-xl p-3 border border-[#6FCF97]/10">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">GST ({gst}%)</span>
//                     <span className="font-mono text-gray-700">₹{gstAmount.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 {/* Divider */}
//                 <div className="border-t border-[#6FCF97]/20 my-2"></div>

//                 {/* Total */}
//                 <div className="bg-gradient-to-r from-[#6FCF97]/20 to-[#2FA084]/10 rounded-xl p-4 border border-[#2FA084]/30">
//                   <div className="flex justify-between items-center text-xl font-bold">
//                     <span className="text-[#1F6F5F]">Total</span>
//                     <span className="font-mono text-[#1F6F5F]">
//                       ₹{total.toFixed(2)}
//                     </span>
//                   </div>
//                   {customerName && (
//                     <div className="text-[#2FA084] text-xs mt-1 flex items-center gap-1.5">
//                       <User className="w-3 h-3" />
//                       {customerName}
//                     </div>
//                   )}
//                   {staffName && (
//                     <div className="text-[#2FA084] text-xs mt-0.5 flex items-center gap-1.5">
//                       <Briefcase className="w-3 h-3" />
//                       Staff: {staffName}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Quick Stats */}
//               <div className="mt-6 grid grid-cols-2 gap-3">
//                 <div className="bg-gray-50 rounded-2xl p-3 text-center border border-[#6FCF97]/10">
//                   <div className="text-[#2FA084] text-[10px] uppercase tracking-wider">Labour %</div>
//                   <div className="text-[#1F6F5F] font-bold text-lg">
//                     {metalValue ? ((labour / metalValue) * 100).toFixed(1) : 0}%
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 rounded-2xl p-3 text-center border border-[#6FCF97]/10">
//                   <div className="text-[#2FA084] text-[10px] uppercase tracking-wider">Quotations</div>
//                   <div className="text-[#1F6F5F] font-bold text-lg">
//                     {savedQuotations.length}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <footer className="mt-12 text-center text-gray-500 text-xs border-t border-[#6FCF97]/20 pt-6">
//           <p className="flex items-center justify-center gap-2">
//             <Gem className="w-3 h-3 text-[#2FA084]" />
//             Suvarna Shilpi Jewellers · Premium Calculator
//             <Gem className="w-3 h-3 text-[#2FA084]" />
//           </p>
//           <p className="mt-1 opacity-70">Advanced Karat & Purity Calculation Engine</p>
//         </footer>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { 
  Plus, Trash2, Save, Printer, History, X, 
  Menu, Diamond, Phone, Mail, User, 
  Calculator as CalcIcon, Sparkles, ChevronDown,
  ArrowRight, Star, CircleDollarSign, Scale,
  Gem, Pin, Weight, Coins, Percent, 
  Tag, IdCard, Scroll, Inbox,
  Clock, Pen, File, Calendar, 
  Wrench, Briefcase, Loader, Trash, RotateCcw,
  AlertCircle, RefreshCw
} from "lucide-react";

const API_URL = 'http://localhost:5000/api';

export default function Calculator() {
  // Main calculator state
  const [metal, setMetal] = useState("Gold");
  const [weight, setWeight] = useState("");
  const [rate, setRate] = useState("");
  const [labourType, setLabourType] = useState("percentage");
  const [labourValue, setLabourValue] = useState("");
  const [stone, setStone] = useState("");
  const [hallmark, setHallmark] = useState("");
  const [discount, setDiscount] = useState("");
  const [gst, setGst] = useState(3);
  const [karat, setKarat] = useState("24");

  // Customer details
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [staffName, setStaffName] = useState("");
  const [quotationNote, setQuotationNote] = useState("");

  // Saved quotations
  const [savedQuotations, setSavedQuotations] = useState([]);
  const [deletedQuotations, setDeletedQuotations] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showRecycleBin, setShowRecycleBin] = useState(false);
  const [editingQuotationId, setEditingQuotationId] = useState(null);
  const [deletedCount, setDeletedCount] = useState(0);
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Gold karat rates (relative to 24K)
  const goldKaratRates = {
    "24": 1.000,
    "22": 0.916,
    "20": 0.833,
    "18": 0.750,
    "14": 0.585,
    "10": 0.417,
    "9": 0.375
  };

  // Silver purity rates (relative to 99.9%)
  const silverPurityRates = {
    "99.9": 1.000,
    "99.5": 0.995,
    "98": 0.980,
    "96": 0.960,
    "92.5": 0.925,
    "90": 0.900,
    "80": 0.800
  };

  // Get current karat/purity rates based on metal
  const getKaratOptions = () => {
    if (metal === "Gold") {
      return Object.keys(goldKaratRates);
    } else if (metal === "Silver") {
      return Object.keys(silverPurityRates);
    } else {
      return ["999", "950", "900", "850"];
    }
  };

  const getKaratRate = () => {
    if (metal === "Gold") {
      return goldKaratRates[karat] || 1;
    } else if (metal === "Silver") {
      return silverPurityRates[karat] || 1;
    } else {
      return 1;
    }
  };

  // Load data
  useEffect(() => {
    fetchQuotations();
    fetchDeletedCount();
  }, []);

  // Fetch active quotations
  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/quotations`);
      if (!response.ok) throw new Error('Failed to fetch quotations');
      const data = await response.json();
      setSavedQuotations(data);
    } catch (error) {
      console.error('Error fetching quotations:', error);
      alert('Failed to load quotations. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch deleted quotations
  const fetchDeletedQuotations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/quotations/deleted`);
      if (!response.ok) throw new Error('Failed to fetch deleted quotations');
      const data = await response.json();
      setDeletedQuotations(data);
    } catch (error) {
      console.error('Error fetching deleted quotations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch deleted count
  const fetchDeletedCount = async () => {
    try {
      const response = await fetch(`${API_URL}/quotations/deleted/count`);
      if (!response.ok) throw new Error('Failed to fetch deleted count');
      const data = await response.json();
      setDeletedCount(data.count);
    } catch (error) {
      console.error('Error fetching deleted count:', error);
    }
  };

  // Calculations with karat adjustment
  const metalValue = Number(weight) * Number(rate) * getKaratRate();
  const labour =
    labourType === "percentage"
      ? (metalValue * Number(labourValue)) / 100
      : Number(weight) * Number(labourValue);
  
  // Other charges combined (stone + hallmark)
  const otherCharges = Number(stone) + Number(hallmark);
  
  const subtotal = metalValue + labour + otherCharges - Number(discount);
  const gstAmount = (subtotal * Number(gst)) / 100;
  const total = subtotal + gstAmount;

  // Generate unique ID
  const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

  // Save quotation to backend
  const saveQuotation = async () => {
    if (!customerName || !customerPhone) {
      alert("Please fill in customer name and phone number");
      return;
    }

    const quotation = {
      id: editingQuotationId || generateId(),
      date: new Date().toLocaleString(),
      customerName,
      customerPhone,
      staffName,
      quotationNote,
      metal,
      karat,
      weight,
      rate,
      labourType,
      labourValue,
      stone,
      hallmark,
      discount,
      gst,
      metalValue,
      labour,
      stoneCost: Number(stone),
      hallmarkCost: Number(hallmark),
      otherCharges,
      discountAmount: Number(discount),
      gstAmount,
      total,
      subtotal
    };

    try {
      setSaving(true);
      
      let response;
      if (editingQuotationId) {
        // Update existing quotation
        response = await fetch(`${API_URL}/quotations/${editingQuotationId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(quotation),
        });
      } else {
        // Create new quotation
        response = await fetch(`${API_URL}/quotations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(quotation),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save quotation');
      }

      const savedQuotation = await response.json();
      
      // Update local state
      if (editingQuotationId) {
        setSavedQuotations(prev =>
          prev.map(q => q.id === editingQuotationId ? savedQuotation : q)
        );
        setEditingQuotationId(null);
      } else {
        setSavedQuotations(prev => [savedQuotation, ...prev]);
      }

      alert(editingQuotationId ? "Quotation updated successfully!" : "Quotation saved successfully!");
      resetForm();
    } catch (error) {
      console.error('Error saving quotation:', error);
      alert(error.message || 'Failed to save quotation. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Load quotation for editing
  const loadQuotation = (quotation) => {
    setMetal(quotation.metal);
    setKarat(quotation.karat || "24");
    setWeight(quotation.weight);
    setRate(quotation.rate);
    setLabourType(quotation.labourType);
    setLabourValue(quotation.labourValue);
    setStone(quotation.stone);
    setHallmark(quotation.hallmark);
    setDiscount(quotation.discount);
    setGst(quotation.gst);
    setCustomerName(quotation.customerName);
    setCustomerPhone(quotation.customerPhone);
    setStaffName(quotation.staffName || "");
    setQuotationNote(quotation.quotationNote || "");
    setEditingQuotationId(quotation.id);
    setShowHistory(false);
    setShowRecycleBin(false);
  };

  // Soft delete quotation (move to recycle bin)
  const deleteQuotation = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quotation? It will be moved to recycle bin and permanently deleted after 7 days.")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/quotations/${id}?staffName=${staffName || 'System'}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete quotation');
      }

      // Remove from active list
      setSavedQuotations(prev => prev.filter(q => q.id !== id));
      
      // Update deleted count
      await fetchDeletedCount();
      
      alert('Quotation moved to recycle bin. It will be permanently deleted after 7 days.');
    } catch (error) {
      console.error('Error deleting quotation:', error);
      alert('Failed to delete quotation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Restore quotation from recycle bin
  const restoreQuotation = async (id) => {
    if (!window.confirm("Are you sure you want to restore this quotation?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/quotations/${id}/restore`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to restore quotation');
      }

      const data = await response.json();
      
      // Remove from deleted list
      setDeletedQuotations(prev => prev.filter(q => q.id !== id));
      
      // Add to active list
      setSavedQuotations(prev => [data.quotation, ...prev]);
      
      // Update deleted count
      await fetchDeletedCount();
      
      alert('Quotation restored successfully!');
    } catch (error) {
      console.error('Error restoring quotation:', error);
      alert('Failed to restore quotation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Permanently delete quotation
  const permanentDeleteQuotation = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this quotation? This action cannot be undone!")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/quotations/${id}/permanent`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to permanently delete quotation');
      }

      // Remove from deleted list
      setDeletedQuotations(prev => prev.filter(q => q.id !== id));
      
      // Update deleted count
      await fetchDeletedCount();
      
      alert('Quotation permanently deleted!');
    } catch (error) {
      console.error('Error permanently deleting quotation:', error);
      alert('Failed to permanently delete quotation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Clean up old deleted records
  const cleanupOldRecords = async () => {
    if (!window.confirm("This will permanently delete all records older than 7 days from recycle bin. Continue?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/quotations/cleanup`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to cleanup old records');
      }

      const data = await response.json();
      alert(data.message);
      
      // Refresh deleted list
      await fetchDeletedQuotations();
      await fetchDeletedCount();
    } catch (error) {
      console.error('Error cleaning up records:', error);
      alert('Failed to cleanup records. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setWeight("");
    setRate("");
    setLabourValue("");
    setStone("");
    setHallmark("");
    setDiscount("");
    setCustomerName("");
    setCustomerPhone("");
    setStaffName("");
    setQuotationNote("");
    setEditingQuotationId(null);
  };

  // Print quotation
  const printQuotation = (quotation) => {
    alert(`Printing quotation for ${quotation.customerName}`);
  };

  // Toggle labour type
  const toggleLabourType = () => {
    setLabourType(labourType === "percentage" ? "gram" : "percentage");
    setLabourValue("");
  };

  // Toggle recycle bin view
  const toggleRecycleBin = async () => {
    const newState = !showRecycleBin;
    setShowRecycleBin(newState);
    if (newState) {
      await fetchDeletedQuotations();
    }
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE] text-gray-800 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Header with Forest Green Theme */}
        <div className="bg-gradient-to-br from-[#1F6F5F] to-[#2FA084] rounded-3xl p-5 sm:p-7 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-2xl">
                <img src="/SSJ2.png" alt="Suvarna Shilpi Logo" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                  Suvarna Shilpi
                  <Sparkles className="w-5 h-5 text-[#6FCF97]" />
                </h1>
                <p className="text-xs text-white/80 font-light tracking-widest uppercase flex items-center gap-1">
                  <span className="text-[#6FCF97]">✦</span> premium jewellery calculator
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={toggleRecycleBin}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-2xl transition-all duration-300 border border-white/20 text-sm font-medium relative"
              >
                <Trash className="w-4 h-4" />
                {showRecycleBin ? "Hide Recycle Bin" : "Recycle Bin"}
                {deletedCount > 0 && !showRecycleBin && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {deletedCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  setShowHistory(!showHistory);
                  setShowRecycleBin(false);
                }}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-2xl transition-all duration-300 border border-white/20 text-sm font-medium"
              >
                <Clock className="w-4 h-4" />
                {showHistory ? "Hide History" : "View History"}
                <ChevronDown className={`w-3 h-3 ml-1 opacity-60 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Recycle Bin Panel */}
        {showRecycleBin && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 mb-8 shadow-lg border border-red-200 overflow-x-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-red-600 flex items-center gap-3">
                <Trash className="w-5 h-5" />
                Recycle Bin
                <span className="text-xs text-gray-500 font-normal ml-2">
                  (Records automatically deleted after 7 days)
                </span>
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={cleanupOldRecords}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Cleanup Old
                </button>
                <span className="text-xs text-[#2FA084] bg-[#6FCF97]/10 px-3 py-1 rounded-full border border-[#6FCF97]/20">
                  {deletedQuotations.length} Records
                </span>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <Loader className="w-8 h-8 text-[#2FA084] animate-spin mx-auto mb-3" />
                <p className="text-sm text-gray-400">Loading deleted records...</p>
              </div>
            ) : deletedQuotations.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Inbox className="w-12 h-12 text-[#6FCF97]/30 mx-auto mb-3" />
                <p className="text-sm">No records in recycle bin</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                      <th className="px-4 py-3 text-left rounded-tl-xl">#</th>
                      <th className="px-4 py-3 text-left">Deleted Date</th>
                      <th className="px-4 py-3 text-left">Customer</th>
                      <th className="px-4 py-3 text-left">Phone</th>
                      <th className="px-4 py-3 text-left">Staff</th>
                      <th className="px-4 py-3 text-left">Metal</th>
                      <th className="px-4 py-3 text-left">Total (₹)</th>
                      <th className="px-4 py-3 text-center rounded-tr-xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deletedQuotations.map((q, index) => (
                      <tr 
                        key={q.id} 
                        className={`border-b border-gray-200 hover:bg-red-50 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                        <td className="px-4 py-3 text-gray-600 text-xs">
                          {q.deletedAt ? new Date(q.deletedAt).toLocaleString() : '-'}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-800">{q.customerName}</td>
                        <td className="px-4 py-3 text-gray-600">{q.customerPhone}</td>
                        <td className="px-4 py-3 text-gray-600">{q.staffName || '-'}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                            {q.metal}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-red-600">₹{Number(q.total).toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => restoreQuotation(q.id)}
                              className="bg-green-500 hover:bg-green-600 text-white p-1.5 rounded-lg transition-all duration-300"
                              title="Restore"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => permanentDeleteQuotation(q.id)}
                              className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg transition-all duration-300"
                              title="Permanent Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* History Panel - Table View */}
        {showHistory && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 mb-8 shadow-lg border border-[#6FCF97]/20 overflow-x-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-[#1F6F5F] flex items-center gap-3">
                <Scroll className="w-5 h-5 text-[#2FA084]" />
                Quotation History
              </h2>
              <span className="text-xs text-[#2FA084] bg-[#6FCF97]/10 px-3 py-1 rounded-full border border-[#6FCF97]/20">
                <File className="w-3 h-3 inline mr-1" />
                {savedQuotations.length} Records
              </span>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <Loader className="w-8 h-8 text-[#2FA084] animate-spin mx-auto mb-3" />
                <p className="text-sm text-gray-400">Loading quotations...</p>
              </div>
            ) : savedQuotations.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Inbox className="w-12 h-12 text-[#6FCF97]/30 mx-auto mb-3" />
                <p className="text-sm">No quotations saved yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#1F6F5F] to-[#2FA084] text-white">
                      <th className="px-4 py-3 text-left rounded-tl-xl">#</th>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Customer</th>
                      <th className="px-4 py-3 text-left">Phone</th>
                      <th className="px-4 py-3 text-left">Staff</th>
                      <th className="px-4 py-3 text-left">Metal</th>
                      <th className="px-4 py-3 text-left">Karat</th>
                      <th className="px-4 py-3 text-left">Weight</th>
                      <th className="px-4 py-3 text-left">Total (₹)</th>
                      <th className="px-4 py-3 text-center rounded-tr-xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedQuotations.map((q, index) => (
                      <tr 
                        key={q.id} 
                        className={`border-b border-[#6FCF97]/10 hover:bg-[#6FCF97]/5 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{q.date}</td>
                        <td className="px-4 py-3 font-medium text-gray-800">{q.customerName}</td>
                        <td className="px-4 py-3 text-gray-600">{q.customerPhone}</td>
                        <td className="px-4 py-3 text-gray-600">{q.staffName || '-'}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-[#6FCF97]/10 text-[#1F6F5F] rounded-full text-xs font-medium">
                            {q.metal}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{q.karat}{q.metal === "Gold" ? "K" : "%"}</td>
                        <td className="px-4 py-3 text-gray-600">{q.weight}g</td>
                        <td className="px-4 py-3 font-semibold text-[#1F6F5F]">₹{Number(q.total).toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => loadQuotation(q)}
                              className="bg-[#2FA084] hover:bg-[#1F6F5F] text-white p-1.5 rounded-lg transition-all duration-300"
                              title="Edit"
                            >
                              <Pen className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => printQuotation(q)}
                              className="bg-[#6FCF97] hover:bg-[#2FA084] text-white p-1.5 rounded-lg transition-all duration-300"
                              title="Print"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteQuotation(q.id)}
                              className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg transition-all duration-300"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Rest of the component remains the same */}
        {/* Main Grid - Inputs and Summary */}
        {/* ... (keep the existing main grid code) ... */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Panel - Inputs */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-7 shadow-lg border border-[#6FCF97]/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Customer Section */}
              <div className="md:col-span-2 bg-gray-50 rounded-2xl p-5 border border-[#6FCF97]/10">
                <h3 className="text-[#1F6F5F] font-semibold text-sm flex items-center gap-2 mb-4">
                  <IdCard className="w-4 h-4 text-[#2FA084]" />
                  Customer & Staff Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3 h-3 text-[#2FA084]" /> Customer Name *
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
                      placeholder="Customer name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-[#2FA084]" /> Phone Number *
                    </label>
                    <input
                      type="phone"
                      className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
                      placeholder="Phone number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                      <Briefcase className="w-3 h-3 text-[#2FA084]" /> Staff Name
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
                      placeholder="Staff name"
                      value={staffName}
                      onChange={(e) => setStaffName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                      <Pen className="w-3 h-3 text-[#2FA084]" /> Notes
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
                      placeholder="Additional notes..."
                      value={quotationNote}
                      onChange={(e) => setQuotationNote(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Left Column - Product Details */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Diamond className="w-3 h-3 text-[#2FA084]" /> Metal Type
                  </label>
                  <select
                    className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
                    value={metal}
                    onChange={(e) => {
                      setMetal(e.target.value);
                      setKarat(e.target.value === "Gold" ? "24" : "99.9");
                    }}
                  >
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Scale className="w-3 h-3 text-[#2FA084]" /> Karat / Purity
                  </label>
                  <select
                    className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
                    value={karat}
                    onChange={(e) => setKarat(e.target.value)}
                  >
                    {getKaratOptions().map((k) => (
                      <option key={k} value={k}>
                        {k}{metal === "Gold" ? "K" : "%"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Weight className="w-3 h-3 text-[#2FA084]" /> Weight (grams)
                  </label>
                  <input
                    type="number"
                    className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
                    placeholder="0.00"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Coins className="w-3 h-3 text-[#2FA084]" /> Rate Per Gram (₹)
                  </label>
                  <input
                    type="number"
                    className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
                    placeholder="24K rate"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Wrench className="w-3 h-3 text-[#2FA084]" /> Labour Method
                  </label>
                  <button
                    onClick={toggleLabourType}
                    className="w-full mt-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 hover:bg-[#6FCF97]/10 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {labourType === "percentage" ? (
                      <Percent className="w-4 h-4" />
                    ) : (
                      <Weight className="w-4 h-4" />
                    )}
                    {labourType === "percentage" ? "Percentage" : "Per Gram"}
                  </button>
                </div>

                <div>
                  <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Gem className="w-3 h-3 text-[#2FA084]" />
                    {labourType === "percentage" ? "Labour (%)" : "Labour Per Gram (₹)"}
                  </label>
                  <input
                    type="number"
                    className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
                    placeholder={labourType === "percentage" ? "Enter percentage" : "Enter per gram rate"}
                    value={labourValue}
                    onChange={(e) => setLabourValue(e.target.value)}
                  />
                </div>
              </div>

              {/* Right Column - Additional Costs */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Gem className="w-3 h-3 text-[#2FA084]" /> Stone Cost (₹)
                  </label>
                  <input
                    type="number"
                    className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
                    placeholder="0.00"
                    value={stone}
                    onChange={(e) => setStone(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Pin className="w-3 h-3 text-[#2FA084]" /> Hallmark Charge (₹)
                  </label>
                  <input
                    type="number"
                    className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
                    placeholder="0.00"
                    value={hallmark}
                    onChange={(e) => setHallmark(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-3 h-3 text-[#2FA084]" /> Discount (₹)
                  </label>
                  <input
                    type="number"
                    className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
                    placeholder="0.00"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Percent className="w-3 h-3 text-[#2FA084]" /> GST (%)
                  </label>
                  <input
                    type="number"
                    className="w-full mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCF97]/50 focus:border-[#2FA084] transition-all duration-300"
                    value={gst}
                    onChange={(e) => setGst(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2.5 pt-2">
                  <button
                    onClick={saveQuotation}
                    disabled={saving}
                    className="w-full bg-gradient-to-r from-[#2FA084] to-[#1F6F5F] text-white font-semibold px-5 py-3 rounded-2xl shadow-lg shadow-[#2FA084]/30 hover:shadow-[#2FA084]/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        {editingQuotationId ? "Updating..." : "Saving..."}
                      </>
                    ) : (
                      <>
                        {editingQuotationId ? <Pen className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                        {editingQuotationId ? "Update Quotation" : "Save Quotation"}
                      </>
                    )}
                  </button>
                  {editingQuotationId && (
                    <button
                      onClick={resetForm}
                      className="w-full bg-gray-100 border border-gray-200 text-gray-600 px-5 py-2.5 rounded-2xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                      <X className="w-4 h-4" />
                      Cancel Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-5 sm:p-7 sticky top-6 shadow-lg border border-[#6FCF97]/20">
              <h2 className="text-xl font-semibold text-[#1F6F5F] flex items-center gap-3 mb-6">
                <CalcIcon className="w-5 h-5 text-[#2FA084]" />
                Summary
              </h2>

              <div className="space-y-3 text-sm">
                {/* Metal Amount */}
                <div className="bg-gray-50 rounded-xl p-3 border border-[#6FCF97]/10">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">💰 Metal Amount</span>
                    <span className="font-mono text-[#1F6F5F] font-semibold">₹{metalValue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{weight || 0}g × ₹{rate || 0} × {getKaratRate() * 100}% purity</span>
                    <span>{karat}{metal === "Gold" ? "K" : "%"}</span>
                  </div>
                </div>

                {/* Labour */}
                <div className="bg-gray-50 rounded-xl p-3 border border-[#6FCF97]/10">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">🔧 Labour</span>
                    <span className="font-mono text-[#1F6F5F] font-semibold">₹{labour.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    {labourType === "percentage" ? (
                      <>
                        <span>{labourValue || 0}% of metal value</span>
                        <span>{metalValue ? ((labour / metalValue) * 100).toFixed(1) : 0}%</span>
                      </>
                    ) : (
                      <>
                        <span>₹{labourValue || 0}/g × {weight || 0}g</span>
                        <span>{metalValue ? ((labour / metalValue) * 100).toFixed(1) : 0}% of metal</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Other Charges */}
                <div className="bg-gray-50 rounded-xl p-3 border border-[#6FCF97]/10">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">💎 Other Charges</span>
                    <span className="font-mono text-[#1F6F5F] font-semibold">₹{otherCharges.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-1">
                    {Number(stone) > 0 && <span>Stone: ₹{Number(stone).toFixed(2)}</span>}
                    {Number(hallmark) > 0 && <span>Hallmark: ₹{Number(hallmark).toFixed(2)}</span>}
                    {!Number(stone) && !Number(hallmark) && <span>No additional charges</span>}
                  </div>
                </div>

                {/* Discount */}
                {Number(discount) > 0 && (
                  <div className="bg-red-50 rounded-xl p-3 border border-red-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">🎯 Discount</span>
                      <span className="font-mono text-red-500 font-semibold">-₹{Number(discount).toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {/* Subtotal */}
                <div className="bg-gray-50 rounded-xl p-3 border border-[#6FCF97]/10">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-mono text-gray-700">₹{subtotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* GST */}
                <div className="bg-gray-50 rounded-xl p-3 border border-[#6FCF97]/10">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">GST ({gst}%)</span>
                    <span className="font-mono text-gray-700">₹{gstAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-[#6FCF97]/20 my-2"></div>

                {/* Total */}
                <div className="bg-gradient-to-r from-[#6FCF97]/20 to-[#2FA084]/10 rounded-xl p-4 border border-[#2FA084]/30">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-[#1F6F5F]">Total</span>
                    <span className="font-mono text-[#1F6F5F]">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                  {customerName && (
                    <div className="text-[#2FA084] text-xs mt-1 flex items-center gap-1.5">
                      <User className="w-3 h-3" />
                      {customerName}
                    </div>
                  )}
                  {staffName && (
                    <div className="text-[#2FA084] text-xs mt-0.5 flex items-center gap-1.5">
                      <Briefcase className="w-3 h-3" />
                      Staff: {staffName}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-2xl p-3 text-center border border-[#6FCF97]/10">
                  <div className="text-[#2FA084] text-[10px] uppercase tracking-wider">Labour %</div>
                  <div className="text-[#1F6F5F] font-bold text-lg">
                    {metalValue ? ((labour / metalValue) * 100).toFixed(1) : 0}%
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-3 text-center border border-[#6FCF97]/10">
                  <div className="text-[#2FA084] text-[10px] uppercase tracking-wider">Active</div>
                  <div className="text-[#1F6F5F] font-bold text-lg">
                    {savedQuotations.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-xs border-t border-[#6FCF97]/20 pt-6">
          <p className="flex items-center justify-center gap-2">
            <Gem className="w-3 h-3 text-[#2FA084]" />
            Suvarna Shilpi Jewellers · Premium Calculator
            <Gem className="w-3 h-3 text-[#2FA084]" />
          </p>
          <p className="mt-1 opacity-70">Advanced Karat & Purity Calculation Engine</p>
        </footer>
      </div>
    </div>
  );
}