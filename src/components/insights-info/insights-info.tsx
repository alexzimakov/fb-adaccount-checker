import * as React from 'react';
import { ActionType } from '../../types';
import { IntlFactory, InsightsTexts } from '../../services/intl';
import {
  ObjectDetails,
  ObjectDetailsProps,
  ObjectDetailsItem,
} from '../object-details';
import { InsightsPresenter } from '../../presenters/insights-presenter';

export interface ActionItemConfig {
  action: ActionType;
  shouldShowActionResult?: boolean;
  shouldShowActionCost?: boolean;
}

export interface InsightsInfoProps extends Omit<ObjectDetailsProps, 'items'> {
  insightsPresenter: InsightsPresenter;
  additionalActionItems?: ActionItemConfig[];
}

export function InsightsInfo({
  insightsPresenter,
  additionalActionItems = [],
  ...props
}: InsightsInfoProps) {
  const requiredItems: ObjectDetailsItem[] = [
    {
      name: IntlFactory._(InsightsTexts.spend),
      value: insightsPresenter.spend,
    },
    {
      name: IntlFactory._(InsightsTexts.ctr),
      value: insightsPresenter.ctr,
    },
    {
      name: IntlFactory._(InsightsTexts.cpc),
      value: insightsPresenter.cpc,
    },
    {
      name: IntlFactory._(InsightsTexts.cpm),
      value: insightsPresenter.cpm,
    },
  ];

  const actionItems: ObjectDetailsItem[] = [];
  const targetAction = insightsPresenter.targetAction;
  if (targetAction) {
    actionItems.push(
      {
        name: insightsPresenter.getTextForActionResult(targetAction),
        value: insightsPresenter.targetActionResult,
      },
      {
        name: insightsPresenter.getTextForActionCost(targetAction),
        value: insightsPresenter.targetActionCost,
      }
    );
  }
  additionalActionItems?.forEach((itemConfig) => {
    if (itemConfig.shouldShowActionResult) {
      actionItems.push({
        name: insightsPresenter.getTextForActionResult(itemConfig.action),
        value: insightsPresenter.getActionResult(itemConfig.action),
      });
    }

    if (itemConfig.shouldShowActionCost) {
      actionItems.push({
        name: insightsPresenter.getTextForActionCost(itemConfig.action),
        value: insightsPresenter.getActionCost(itemConfig.action),
      });
    }
  });

  return (
    <ObjectDetails {...props} items={[...actionItems, ...requiredItems]} />
  );
}
