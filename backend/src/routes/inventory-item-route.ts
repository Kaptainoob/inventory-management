import * as inventoryItemService from '../services/inventory-item-service';
import * as logService from '../services/log-service';
import { Router, Request, Response } from 'express';
import { IInventoryItem } from '../models/inventory-item-model';

export const router = Router();

router.post('/createinventoryitem', (req: Request, res: Response) => {
    logService.logActivity(req);
    const name: string = req.query.name;
    const inventoryItemsGroupId: string = req.query.inventoryItemsGroupId;
    const financialUnitId: string = req.query.financialUnitId;
    console.log(name, inventoryItemsGroupId, financialUnitId);
    if (!name || !inventoryItemsGroupId || !financialUnitId) {
        res.status(400).send('Missing URL parameter(s)');
    }
    inventoryItemService.createInventoryItem(name, inventoryItemsGroupId, financialUnitId).then((inventoryItem: IInventoryItem) => {
        res.status(200).send(inventoryItem);
    }).catch((err) => {
        logService.logError(err);
        res.status(500).send(err);
    });
});

router.get('/getallinventoryitems', (req: Request, res: Response) => {
    logService.logActivity(req);
    const financialUnitId: string = req.query.financialUnitId;
    if (!financialUnitId) {
        res.status(400).send('Missing URL parameter: financialUnitId');
    }
    inventoryItemService.getAllInventoryItems(financialUnitId).then((inventoryItems: IInventoryItem[]) => {
        res.status(200).send(inventoryItems);
    }).catch((err) => {
        res.status(500).send(err);
    });
});