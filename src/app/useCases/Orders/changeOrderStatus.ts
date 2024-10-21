import { NextFunction, Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function changeOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Verifica se o status é válido
    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
       res.status(400).json({
        error: 'Status should be one of these: WAITING, IN_PRODUCTION, DONE',
      });
    }

    // Verifica se a ordem existe antes de atualizar
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
    }

    // Atualiza o status da ordem
    await Order.findByIdAndUpdate(orderId, { status });
    res.sendStatus(204); // Envia resposta 204 (Sem conteúdo)

  } catch (error) {
    // Passa o erro para o middleware de tratamento de erros
    next(error);
  }
}
