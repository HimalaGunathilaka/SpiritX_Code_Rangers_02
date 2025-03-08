module.exports = {

"[project]/.next-internal/server/app/api/player/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/mongoose [external] (mongoose, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}}),
"[project]/lib/dbconfig.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const connectMongo = async ()=>{
    const mongoUrl = process.env.MONGO_URL;
    console.log("Connecting to mongo with URL:", mongoUrl);
    if (!mongoUrl) {
        throw new Error("MONGO_URL environment variable is not defined");
    }
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connection.readyState === 1) {
        console.log("Already connected to mongo");
        return __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connection.asPromise();
    }
    return __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(mongoUrl);
};
const __TURBOPACK__default__export__ = connectMongo;
}}),
"[project]/models/player.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const PlayerSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    _id: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    totalruns: {
        type: Number,
        required: true
    },
    ballsfaced: {
        type: Number,
        required: true
    },
    inningsplayed: {
        type: Number,
        required: true
    },
    wickets: {
        type: Number,
        required: true
    },
    overbowled: {
        type: Number,
        required: true
    },
    runsconceded: {
        type: Number,
        required: true
    }
}, {
    timestamps: false,
    versionKey: false
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Player || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Player', PlayerSchema);
}}),
"[project]/app/api/player/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DELETE": (()=>DELETE),
    "GET": (()=>GET),
    "PATCH": (()=>PATCH),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dbconfig$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dbconfig.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$player$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/player.ts [app-route] (ecmascript)");
;
;
;
;
const GET = async ()=>{
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dbconfig$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const players = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$player$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find();
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify(players), {
            status: 200
        });
    } catch (error) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]("Error in fetching players: " + error.message, {
            status: 500
        });
    }
};
const POST = async (request)=>{
    try {
        const body = await request.json();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dbconfig$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const newPlayer = new __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$player$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](body);
        await newPlayer.save();
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify(newPlayer), {
            status: 201
        });
    } catch (error) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]("Error in creating player: " + error.message, {
            status: 500
        });
    }
};
const PATCH = async (request)=>{
    try {
        const body = await request.json();
        const { playerId, ...updateData } = body;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dbconfig$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Types.ObjectId.isValid(playerId)) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]("Invalid Player ID", {
                status: 400
            });
        }
        const updatedPlayer = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$player$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findByIdAndUpdate(playerId, updateData, {
            new: true
        });
        if (!updatedPlayer) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]("Player not found", {
                status: 404
            });
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify(updatedPlayer), {
            status: 200
        });
    } catch (error) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]("Error in updating player: " + error.message, {
            status: 500
        });
    }
};
const DELETE = async (request)=>{
    try {
        const { searchParams } = new URL(request.url);
        const playerId = searchParams.get("playerId");
        if (!playerId) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]("Player ID not found", {
                status: 400
            });
        }
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Types.ObjectId.isValid(playerId)) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]("Invalid Player ID", {
                status: 400
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dbconfig$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const deletedPlayer = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$player$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findByIdAndDelete(playerId);
        if (!deletedPlayer) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]("Player not found", {
                status: 404
            });
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify(deletedPlayer), {
            status: 200
        });
    } catch (error) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]("Error in deleting player: " + error.message, {
            status: 500
        });
    }
};
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__47e838f3._.js.map