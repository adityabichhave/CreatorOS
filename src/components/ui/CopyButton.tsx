'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  variant?: 'default' | 'ghost' | 'icon';
}

export function CopyButton({ text, label = 'Copy', className, variant = 'default' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (variant === 'icon') {
    return (
      <motion.button
        onClick={handleCopy}
        whileTap={{ scale: 0.9 }}
        className={cn(
          'p-1.5 rounded-lg transition-all duration-200',
          copied
            ? 'bg-green-500/20 text-green-400'
            : 'bg-white/5 text-slate-400 hover:bg-brand-500/15 hover:text-brand-400',
          className
        )}
        title={copied ? 'Copied!' : 'Copy'}
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'copy-btn',
        copied && 'bg-green-500/15 text-green-400 border-green-500/30',
        className
      )}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>{label}</span>
        </>
      )}
    </motion.button>
  );
}
