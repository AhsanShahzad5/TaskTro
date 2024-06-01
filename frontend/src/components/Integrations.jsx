import React from 'react'
import drive from '../assets/images/integrations/drive.png'
import dropbox from '../assets/images/integrations/dropbox.png'
import evernote from '../assets/images/integrations/evernote.png'
import teams from '../assets/images/integrations/teams.png'
import calendar from '../assets/images/integrations/calendar.png'
import slack from '../assets/images/integrations/slack.png'
import zapier from '../assets/images/integrations/zapier.png'
import trello from '../assets/images/integrations/trello.png'
import github from '../assets/images/integrations/github.jpg'

const integrationsUsed = [
    {
        name: 'Google Calendar',
        description: 'Sync your tasks with your calendar.',
        imageUrl: calendar,
      },
      {
        name: 'Slack',
        description: 'Receive updates and add tasks within Slack.',
        imageUrl: slack,
      },
      {
        name: 'Zapier',
        description: 'Automate your tasks with Zapier integrations.',
        imageUrl: zapier,
      },
      {
        name: 'Microsoft Teams',
        description: 'Collaborate and manage tasks within Microsoft Teams.',
        imageUrl: teams ,
      },
      {
        name: 'Dropbox',
        description: 'Attach files from Dropbox to your tasks.',
        imageUrl: dropbox ,
      },
      {
        name: 'Google Drive',
        description: 'Attach files from Google Drive to your tasks.',
        imageUrl: drive,
      },
      {
        name: 'Evernote',
        description: 'Link your notes and tasks seamlessly.',
        imageUrl: evernote,
      },
      {
        name: 'Trello',
        description: 'Sync tasks between Todoist and Trello boards.',
        imageUrl: trello,
      },
      {
        name: 'GitHub',
        description: 'Track issues and pull requests within Todoist.',
        imageUrl: github,
      }
];

const Integrations = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-12">Integrations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {integrationsUsed.map((integration) => (
            <div key={integration.name} className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-6">
              <img src={integration.imageUrl} alt={integration.name} className="h-16 w-16 object-contain" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{integration.name}</h2>
                <p className="text-gray-700">{integration.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Integrations