import {WorkflowStoreSelectors} from '@root-store/workflow-store';
import {createSelectorFactory, defaultMemoize} from '@ngrx/store';

const customMemoizer = (aFn) => defaultMemoize(aFn, (a: any, b: any) => a === b);

export const selectError =
  createSelectorFactory(customMemoizer)(
    WorkflowStoreSelectors.selectError,
    (...args: string[]) => {
      // console.log('selectError.args', args);
      return args.join('');
    }
  );

export const selectIsLoading =
  createSelectorFactory(customMemoizer)(
    WorkflowStoreSelectors.selectIsLoading,
    (...args: boolean[]) => {
      // console.log('selectIsLoading.args', args);
      return args.find((value => value));
    }
  );

