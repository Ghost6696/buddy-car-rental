import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface ContentBlock {
    id: string;
    section: string;
    key: string;
    value: string;
}

const defaultContent: ContentBlock[] = [
    { id: '1', section: 'Hero', key: 'heading', value: 'Find Your Perfect Rental Car' },
    { id: '2', section: 'Hero', key: 'subheading', value: 'Affordable, reliable vehicles for every adventure.' },
    { id: '3', section: 'Stats', key: 'customers', value: '500+' },
    { id: '4', section: 'Stats', key: 'vehicle_types', value: '8+' },
    { id: '5', section: 'Contact', key: 'phone', value: '+354 555 1234' },
    { id: '6', section: 'Contact', key: 'email', value: 'info@buddycarrental.is' },
    { id: '7', section: 'Contact', key: 'address', value: 'Keflavík Airport, Iceland' },
];

export default function ContentPage() {
    const [content, setContent] = useState<ContentBlock[]>(() => {
        const saved = localStorage.getItem('buddy_cms_content');
        return saved ? JSON.parse(saved) : defaultContent;
    });
    const [saved, setSaved] = useState(false);

    const update = (id: string, value: string) => {
        setContent(c => c.map(item => item.id === id ? { ...item, value } : item));
    };

    const remove = (id: string) => {
        setContent(c => c.filter(item => item.id !== id));
    };

    const handleSave = () => {
        localStorage.setItem('buddy_cms_content', JSON.stringify(content));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    // Group by section
    const sections = content.reduce<Record<string, ContentBlock[]>>((acc, item) => {
        (acc[item.section] = acc[item.section] || []).push(item);
        return acc;
    }, {});

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Content Management</h1>
                <button onClick={handleSave} className="btn btn-primary btn-sm">
                    <Save className="w-4 h-4" />
                    {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>

            {saved && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-6 text-sm text-[var(--color-success)] text-center">
                    Content saved successfully!
                </div>
            )}

            {Object.entries(sections).map(([section, items]) => (
                <div key={section} className="bg-white rounded-xl border border-[var(--color-border)] mb-4">
                    <div className="p-4 border-b border-[var(--color-border)]">
                        <h2 className="font-semibold text-sm uppercase tracking-wide text-[var(--color-text-secondary)]">{section}</h2>
                    </div>
                    <div className="p-4 space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="flex gap-3 items-start">
                                <div className="flex-1">
                                    <label className="label text-xs">{item.key}</label>
                                    <input
                                        className="input"
                                        value={item.value}
                                        onChange={e => update(item.id, e.target.value)}
                                    />
                                </div>
                                <button onClick={() => remove(item.id)} className="mt-6 p-2 rounded-lg hover:bg-red-50 text-[var(--color-error)]">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <p className="text-xs text-[var(--color-text-muted)] text-center mt-6">
                Content is stored locally. Changes will persist in your browser.
            </p>
        </div>
    );
}
