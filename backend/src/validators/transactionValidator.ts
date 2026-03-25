import Joi from 'joi';

export const transactionSchema = Joi.object({
  amount: Joi.number().positive().required(),
  rib: Joi.string()
    .pattern(/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/)
    .required(),
  bic: Joi.string()
    .pattern(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/)
    .required(),
  date: Joi.date().iso().max('now').optional(),
  allocations: Joi.array()
    .items(
      Joi.object({
        fundIsin: Joi.string().required(),
        allocationPercent: Joi.number().positive().max(100).required(),
      })
    )
    .min(1)
    .required(),
});
