import { Bug, UserPlus, AlertCircle, Radio, FileEdit, Trash2 } from 'lucide-react';

interface RightPanelProps {
  isDarkMode: boolean;
}

export function RightPanel({ isDarkMode }: RightPanelProps) {
  const notifications = [
    { icon: Bug, text: 'You have a bug that needs...', time: 'Just now' },
    { icon: UserPlus, text: 'New user registered', time: '59 minutes ago' },
    { icon: Bug, text: 'You have a bug that needs...', time: '12 hours ago' },
    { icon: Radio, text: 'Andi Lane subscribed to you', time: 'Today, 11:59 AM' }
  ];

  const activities = [
    { icon: Bug, text: 'You have a bug that needs...', time: 'Just now', avatar: '👤' },
    { icon: null, text: 'Released a new version', time: '59 minutes ago', avatar: '👤' },
    { icon: null, text: 'Submitted a bug', time: '12 hours ago', avatar: '👤' },
    { icon: FileEdit, text: 'Modified a data in Page X', time: 'Today, 11:59 AM', avatar: '👤' },
    { icon: Trash2, text: 'Deleted a page in Project X', time: 'Dec 2, 2023', avatar: '👤' }
  ];

  const contacts = [
    { name: 'Natali Craig', avatar: '👤' },
    { name: 'Drew Cano', avatar: '👤' },
    { name: 'Orlando Diggs', avatar: '👤' },
    { name: 'Andi Lane', avatar: '👤' },
    { name: 'Kate Morrison', avatar: '👤' },
    { name: 'Koray Okumus', avatar: '👤' }
  ];

  return (
    <div className={`w-[280px] border-l ${isDarkMode ? 'border-gray-700 bg-[#1a1a1a]' : 'border-gray-200 bg-white'} h-screen overflow-y-auto`}>
      {/* Notifications */}
      <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className={`mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</div>
        <div className="space-y-3">
          {notifications.map((notif, i) => (
            <div key={i} className="flex gap-3">
              <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center flex-shrink-0`}>
                <notif.icon className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-900'} mb-0.5`}>{notif.text}</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{notif.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className={`mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Activities</div>
        <div className="space-y-3">
          {activities.map((activity, i) => (
            <div key={i} className="flex gap-3">
              <div className={`w-6 h-6 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} flex items-center justify-center flex-shrink-0 text-xs`}>
                {activity.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-900'} mb-0.5`}>{activity.text}</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div className="p-4">
        <div className={`mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Contacts</div>
        <div className="space-y-2">
          {contacts.map((contact, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} flex items-center justify-center flex-shrink-0 text-xs`}>
                {contact.avatar}
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{contact.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
