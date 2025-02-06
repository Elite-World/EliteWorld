'use client';

import { useModalStore } from '@/lib/stores/useModalStore';
import { Modal } from '../components/Modal';
import { useThemeStore } from '@/lib/stores/useThemeStore';
import { cn } from '@/lib/utils';

export function LoginModal() {
  const isDark = useThemeStore((state) => state.isDark);
  const { close } = useModalStore();

  return (
    <Modal 
      isOpen 
      onClose={close}
      variant="popup"
    >
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Log In</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className={cn(
                  'w-full px-4 py-2 rounded-lg border',
                  isDark 
                    ? 'bg-[#2C2C2E] border-[#3C3C3E] text-white' 
                    : 'bg-white border-gray-200'
                )}
              />
            </div>
            {/* Add more form fields */}
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={close}
              className={cn(
                'px-4 py-2 rounded-lg',
                isDark 
                  ? 'hover:bg-[#2C2C2E]' 
                  : 'hover:bg-gray-100'
              )}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
} 