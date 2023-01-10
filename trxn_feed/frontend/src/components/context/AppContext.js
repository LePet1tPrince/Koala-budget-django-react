import React from 'react';
import { DashboardContext } from './DashboardContext';
import { TrxnContext } from './TrxnContext';
import { AccountContext } from './AccountContext';
import { GoalContext } from './GoalContext';




export function AppContext({ children }) {
  return (
    <DashboardContext>
        <TrxnContext>
            <AccountContext>
                <GoalContext>
                    {children}
                </GoalContext>
            </AccountContext>
        </TrxnContext>
    </DashboardContext>
  )
}
