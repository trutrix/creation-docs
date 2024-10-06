// Primitives
const u8 = 'u8';
const u16 = 'u16';
const u32 = 'u32';
const u64 = 'u64';
const i8 = 'i8';
const i16 = 'i16';
const i32 = 'i32';
const i64 = 'i64';
const f32 = 'f32';
const f64 = 'f64';
const zstring = 'ZString';
const lstring = 'LString';
const formid = 'FormId';
const formlist = `FormList`;
const bool8 = 'bool8';

// Common fields
const EDID = { id: 'EDID', name: 'Editor ID', type: zstring, tags: ['common'] };
const OBND = { id: 'OBND', name: 'Object Bounds', type: { x1: i16, y1: i16, z1: i16, x2: i16, y2: i16, z2: i16 }, tags: ['common'] };
const CNAM = { id: 'CNAM', name: 'Color', type: { r: u8, g: u8, b: u8, a: u8 }, tags: ['common'] };
const VMAD = { id: 'VMAD', name: 'Virtual Machine Adapter', type: 'VirtualMachineAdapter', tags: ['common'] };
const PTRN = { id: 'PTRN', name: 'Preview Transform', type: rr('TRNS'), tags: ['common'] };
const STCP = { id: 'STCP', name: 'Sound Type', type: rr('STAG'), tags: ['common'] };
const FULL = { id: 'FULL', name: 'Name', type: u32, tags: ['common'] };

const MODL = { id: 'MODL', name: 'Model Filename', type: 'zstring', tags: ['common'] };
const MODT = { id: 'MODT', name: 'Model Texture', type: 'wip', tags: ['common'] };
const MODS = { id: 'MODS', name: 'Material Swap', type: 'wip', tags: ['common'] };
const MODC = { id: 'MODC', name: 'Model Color Remapping Index', type: f32, tags: ['common'] };
const MODF = { id: 'MODF', name: 'Model Flags', type: u8, tags: ['common'] };

const DEST = { id: 'DEST', name: 'DestructibleHeader', type: { health: i32, dest_count: u8, flags: u8, unknown: u16 }, tags: ['common'] };
const KSIZ = { id: 'KSIZ', name: 'Keyword Count', type: u32, tags: ['common'] };

function record_list() {
    return [
        { 
            id: 'TES4', name: 'FileHeader', fields: [
                { id: 'HEDR', name: 'Metadata', type: { version: f32, record_count: u32, next_record_id: u32 } },
                { id: 'CNAM', name: 'Author', type: zstring },
                { id: 'SNAM', name: 'Description', type: zstring },
                { id: 'INCC', name: 'Interior Cell Count', type: u32 },
                { id: 'INTV', name: 'Unknown', type: u32 },
                { id: 'TNAM', name: 'Transient Types', type: { type: u32, idens: formlist}, tags: ['editor_only'] },
            ]
        },
        {
            id: 'ASPC', name: 'Acoustic Space', tags: ['has_ref'], fields: [
                EDID,
                OBND,
                { id: 'RDAT', name: 'UseSoundFromRegion', type: rr('REGN')},
                { id: 'SNAM', name: 'LoopingSound', type: rr('SNDR')},
                { id: 'XTRI', name: 'Is Interior', type: bool8},
                { id: 'BNAM', name: 'Environment Type', type: rr('REVB')},
                { id: 'WNAM', name: 'Weather Attenuation', type: f32},
            ]
        },
        {
            id: 'AACT', name: 'Action', tags: ['has_ref'], flags: [], fields: [
                EDID,
                CNAM,
                { id: 'TNAM', name: 'Type', type: u32 },
                { id: 'DNAM', name: 'Notes', type: zstring},
                { id: 'DATA', name: 'AttractionRule', type: rr('AORU')},
            ]
        },
        {
            id: 'ACTI', name: 'Activator', tags: ['has_ref'], fields: [
                EDID,
                VMAD,
                OBND,
                PTRN,
                STCP,
                FULL,
                MODL,
                MODT,
                MODS,
                MODC,
                MODF,
                DEST,
                KSIZ,
                // wbKWDAs,
                // wbPRPS,
                // wbNTRM,
                // wbFTYP,
            ]
        }


    ]
}


// Record Reference
function rr(id) {
    return `Ref [${id}]`;
}
