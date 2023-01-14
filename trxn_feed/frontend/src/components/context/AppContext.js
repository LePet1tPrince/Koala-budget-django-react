import React from 'react';
import { DashboardContext } from './DashboardContext';
import { TrxnContext } from './TrxnContext';
import { AccountContext } from './AccountContext';
import { GoalContext } from './GoalContext';
import { BudgetContext } from './BudgetContext';




export function AppContext({ children }) {
  return (
    <DashboardContext>
        <TrxnContext>
            <AccountContext>
                <GoalContext>
                  <BudgetContext>
                    {children}
                  </BudgetContext>
                </GoalContext>
            </AccountContext>
        </TrxnContext>
    </DashboardContext>
  )
}
