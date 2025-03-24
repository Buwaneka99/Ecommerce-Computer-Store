import express from 'express';
import { 
    getSupplies,
    getSupplyById,
    createSupply,
    updateSupply,
    deleteSupply, 
} from '../Controllers/supplyRequestController.js';