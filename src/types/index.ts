/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Request, Response } from 'express';
import { Send, Query } from 'express-serve-static-core';

export type ResponseData = {
  message: string;
  data: [];
};
export type Sfia = {
  sfiaid: string;
  levels: string;
  level1: string;
  level2: string;
  level3: string;
  level5: string;
  level6: string;
  level7: string;
  code: string;
  skill: string;
  category: string;
  subcategory: string;
  overalldescription: string;
  guidancenotes: string;
  level1description: string;
  level2description: string;
  level3description: string;
  level4description: string;
  level5description: string;
  level6description: string;
  level7description: string;
  keywords: string[];
};

export type SfiaResult = {
  sfiaSkillId: number;
  hashkeyId: string;
  result: string;
};
export type SoftResult = {
  softSkillId: number;
  hashkeyId: string;
  result: string;
};

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export interface TypedRequestQuery<T extends Query> extends Request {
  query: T;
}

export interface TypedRequest<T extends Query, U> extends Request {
  body: U;
  query: T;
}

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}
