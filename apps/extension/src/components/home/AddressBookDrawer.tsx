import { Button } from '@/components/ui/button'
import BottomModal from '@/components/ButtomDrawer'
import { BookOpen, Plus, UserPlus, Download, Upload } from 'lucide-react'

interface AddressBookDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const AddressBookDrawer = ({ isOpen, onClose }: AddressBookDrawerProps) => {
  // Mock data - replace with actual address book data
  const contacts = [
    {
      id: '1',
      name: 'Alice Cooper',
      address: '0x1234...5678',
      type: 'Hedera Account',
    },
    {
      id: '2',
      name: 'Bob Smith',
      address: '0x8765...4321',
      type: 'Hedera Account',
    },
  ]

  return (
    <BottomModal
      isOpen={isOpen}
      onClose={onClose}
      title='Address Book'
      fullScreen={true}
      footerComponent={
        <div className='flex gap-2 w-full'>
          <Button variant='outline' className='flex-1' onClick={onClose}>
            Close
          </Button>
          <Button className='flex-1' onClick={() => {}}>
            <Plus className='w-4 h-4 mr-1' />
            Add Contact
          </Button>
        </div>
      }
    >
      <div className='space-y-4'>
        {/* Header Actions */}
        <div className='flex gap-2'>
          <Button variant='outline' size='sm' className='flex-1'>
            <Upload className='w-4 h-4 mr-1' />
            Import
          </Button>
          <Button variant='outline' size='sm' className='flex-1'>
            <Download className='w-4 h-4 mr-1' />
            Export
          </Button>
        </div>

        {/* Search Bar */}
        <div className='relative'>
          <input
            type='text'
            placeholder='Search contacts...'
            className='w-full p-3 border rounded-lg bg-background text-foreground placeholder-muted-foreground'
          />
        </div>

        {/* Contacts List */}
        <div className='space-y-3'>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <div
                key={contact.id}
                className='p-4 border rounded-lg hover:bg-accent/50 transition-colors'
              >
                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm'>
                    {contact.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className='flex-1'>
                    <h4 className='font-medium text-sm'>{contact.name}</h4>
                    <p className='text-xs text-muted-foreground font-mono'>{contact.address}</p>
                    <p className='text-xs text-muted-foreground'>{contact.type}</p>
                  </div>
                  <Button variant='ghost' size='sm'>
                    Edit
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className='text-center py-8'>
              <BookOpen className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
              <h3 className='text-lg font-medium mb-2'>No Contacts Yet</h3>
              <p className='text-muted-foreground text-sm mb-4'>
                Add contacts to quickly send transactions
              </p>
              <Button>
                <UserPlus className='w-4 h-4 mr-1' />
                Add First Contact
              </Button>
            </div>
          )}
        </div>
      </div>
    </BottomModal>
  )
}

export default AddressBookDrawer
