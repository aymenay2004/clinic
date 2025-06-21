import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Package, 
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Calendar,
  Barcode,
  Filter,
  Download,
  Scan,
  Bell
} from 'lucide-react';
import { Medicine, StockAlert } from '../../types';

const InventoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'low' | 'expired' | 'normal'>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | 'antibiotic' | 'painkiller' | 'anesthetic' | 'antiseptic' | 'supplement' | 'equipment'>('all');

  // Mock data with Algerian Dinars
  const mockMedicines: Medicine[] = [
    {
      id: '1',
      name: 'Anesthésique Local (Lidocaïne 2%)',
      barcode: '1234567890123',
      quantity: 5,
      unit: 'ampoules',
      expiryDate: new Date('2024-06-15'),
      provider: 'Pharma Dental Algérie',
      price: 1250.00, // DA
      minStockLevel: 10,
      category: 'anesthetic',
      description: 'Anesthésique local pour interventions dentaires',
      sideEffects: ['Réaction allergique rare', 'Engourdissement temporaire'],
      dosageInstructions: '1-2 ml selon la zone à anesthésier',
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Composite Dentaire Universel',
      barcode: '2345678901234',
      quantity: 25,
      unit: 'seringues',
      expiryDate: new Date('2025-03-20'),
      provider: 'DentMat Algérie',
      price: 2890.00, // DA
      minStockLevel: 15,
      category: 'equipment',
      description: 'Composite photopolymérisable pour restaurations',
      createdAt: new Date('2023-02-10'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: '3',
      name: 'Désinfectant Surfaces',
      barcode: '3456789012345',
      quantity: 2,
      unit: 'litres',
      expiryDate: new Date('2024-02-28'),
      provider: 'MediClean Algérie',
      price: 850.75, // DA
      minStockLevel: 5,
      category: 'antiseptic',
      description: 'Désinfectant pour surfaces et instruments',
      createdAt: new Date('2023-03-05'),
      updatedAt: new Date('2024-01-05')
    },
    {
      id: '4',
      name: 'Amoxicilline 500mg',
      barcode: '4567890123456',
      quantity: 50,
      unit: 'comprimés',
      expiryDate: new Date('2025-08-15'),
      provider: 'Antibio Pharma',
      price: 45.50, // DA per tablet
      minStockLevel: 30,
      category: 'antibiotic',
      description: 'Antibiotique à large spectre',
      sideEffects: ['Troubles digestifs', 'Réactions allergiques'],
      dosageInstructions: '500mg 3 fois par jour pendant 7 jours',
      createdAt: new Date('2023-04-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '5',
      name: 'Ibuprofène 400mg',
      barcode: '5678901234567',
      quantity: 8,
      unit: 'boîtes',
      expiryDate: new Date('2024-12-31'),
      provider: 'Pain Relief Co.',
      price: 320.00, // DA per box
      minStockLevel: 15,
      category: 'painkiller',
      description: 'Anti-inflammatoire non stéroïdien',
      sideEffects: ['Troubles gastriques', 'Maux de tête'],
      dosageInstructions: '400mg toutes les 6-8 heures si nécessaire',
      createdAt: new Date('2023-05-10'),
      updatedAt: new Date('2024-01-10')
    }
  ];

  const mockAlerts: StockAlert[] = [
    {
      id: '1',
      medicine: mockMedicines[0],
      type: 'low_stock',
      message: 'Stock critique: Anesthésique Local (5 restants)',
      isRead: false,
      createdAt: new Date()
    },
    {
      id: '2',
      medicine: mockMedicines[2],
      type: 'expiry_warning',
      message: 'Expire bientôt: Désinfectant Surfaces (28 jours)',
      isRead: false,
      createdAt: new Date()
    }
  ];

  const getStockStatus = (medicine: Medicine) => {
    const today = new Date();
    const daysUntilExpiry = Math.ceil((medicine.expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return 'expired';
    if (daysUntilExpiry < 30) return 'expiring';
    if (medicine.quantity <= medicine.minStockLevel) return 'low';
    return 'normal';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'expiring': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'low': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'normal': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'expired': return 'Expiré';
      case 'expiring': return 'Expire bientôt';
      case 'low': return 'Stock faible';
      case 'normal': return 'Normal';
      default: return status;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'antibiotic': return 'Antibiotique';
      case 'painkiller': return 'Antidouleur';
      case 'anesthetic': return 'Anesthésique';
      case 'antiseptic': return 'Antiseptique';
      case 'supplement': return 'Complément';
      case 'equipment': return 'Équipement';
      default: return category;
    }
  };

  const filteredMedicines = mockMedicines.filter(medicine => {
    const matchesSearch = 
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.barcode.includes(searchTerm) ||
      medicine.provider.toLowerCase().includes(searchTerm.toLowerCase());

    const status = getStockStatus(medicine);
    const matchesFilter = 
      filterStatus === 'all' ||
      (filterStatus === 'low' && status === 'low') ||
      (filterStatus === 'expired' && (status === 'expired' || status === 'expiring')) ||
      (filterStatus === 'normal' && status === 'normal');

    const matchesCategory = 
      filterCategory === 'all' || medicine.category === filterCategory;

    return matchesSearch && matchesFilter && matchesCategory;
  });

  const stats = [
    {
      title: 'Total Articles',
      value: mockMedicines.length.toString(),
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Stock Faible',
      value: mockMedicines.filter(m => getStockStatus(m) === 'low').length.toString(),
      icon: TrendingDown,
      color: 'yellow'
    },
    {
      title: 'Expirations Proches',
      value: mockMedicines.filter(m => ['expired', 'expiring'].includes(getStockStatus(m))).length.toString(),
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Valeur Totale',
      value: `${mockMedicines.reduce((sum, m) => sum + (m.price * m.quantity), 0).toLocaleString()} DA`,
      icon: TrendingUp,
      color: 'green'
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Gestion d'Inventaire</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gérez le stock de médicaments et fournitures
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Scan className="w-5 h-5" />
            <span>Scanner</span>
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Exporter</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Ajouter Article</span>
          </button>
        </div>
      </motion.div>

      {/* Alerts */}
      {mockAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4"
        >
          <div className="flex items-center space-x-2 mb-3">
            <Bell className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h3 className="font-semibold text-red-800 dark:text-red-300">Alertes Stock</h3>
          </div>
          <div className="space-y-2">
            {mockAlerts.map(alert => (
              <div key={alert.id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3">
                <span className="text-sm text-gray-900 dark:text-gray-100">{alert.message}</span>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                  Marquer comme lu
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, code-barres ou fournisseur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">Tous les statuts</option>
                <option value="normal">Stock normal</option>
                <option value="low">Stock faible</option>
                <option value="expired">Expirations</option>
              </select>
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as any)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="all">Toutes catégories</option>
              <option value="antibiotic">Antibiotiques</option>
              <option value="painkiller">Antidouleurs</option>
              <option value="anesthetic">Anesthésiques</option>
              <option value="antiseptic">Antiseptiques</option>
              <option value="supplement">Compléments</option>
              <option value="equipment">Équipements</option>
            </select>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Article</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Code-barres</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Catégorie</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Stock</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Prix Unitaire</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Valeur Totale</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Expiration</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((medicine, index) => {
                const status = getStockStatus(medicine);
                const totalValue = medicine.price * medicine.quantity;
                return (
                  <motion.tr
                    key={medicine.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{medicine.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{medicine.provider}</p>
                        {medicine.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{medicine.description}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Barcode className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400 font-mono text-sm">{medicine.barcode}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-xs font-medium">
                        {getCategoryText(medicine.category)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <span className={`font-medium ${medicine.quantity <= medicine.minStockLevel ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'}`}>
                          {medicine.quantity} {medicine.unit}
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-500">Min: {medicine.minStockLevel}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
                        {medicine.price.toLocaleString()} DA
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
                        {totalValue.toLocaleString()} DA
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {medicine.expiryDate.toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                        {getStatusText(status)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded" title="Ajouter stock">
                          <Plus className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded" title="Retirer stock">
                          <TrendingDown className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded" title="Scanner">
                          <Scan className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Aucun article trouvé</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Essayez de modifier vos critères de recherche.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default InventoryPage;