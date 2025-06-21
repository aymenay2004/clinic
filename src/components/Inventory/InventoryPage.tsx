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
  Barcode
} from 'lucide-react';
import { Medicine } from '../../types';

const InventoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'low' | 'expired' | 'normal'>('all');

  // Mock data
  const mockMedicines: Medicine[] = [
    {
      id: '1',
      name: 'Anesthésique Local',
      barcode: '1234567890123',
      quantity: 5,
      unit: 'ampoules',
      expiryDate: new Date('2024-06-15'),
      provider: 'Pharma Dental',
      price: 45.50,
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Composite Dentaire',
      barcode: '2345678901234',
      quantity: 25,
      unit: 'seringues',
      expiryDate: new Date('2025-03-20'),
      provider: 'DentMat',
      price: 89.00,
      createdAt: new Date('2023-02-10'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: '3',
      name: 'Désinfectant',
      barcode: '3456789012345',
      quantity: 2,
      unit: 'litres',
      expiryDate: new Date('2024-02-28'),
      provider: 'MediClean',
      price: 25.75,
      createdAt: new Date('2023-03-05'),
      updatedAt: new Date('2024-01-05')
    }
  ];

  const getStockStatus = (medicine: Medicine) => {
    const today = new Date();
    const daysUntilExpiry = Math.ceil((medicine.expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return 'expired';
    if (daysUntilExpiry < 30) return 'expiring';
    if (medicine.quantity < 10) return 'low';
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

  const filteredMedicines = mockMedicines.filter(medicine => {
    const matchesSearch = 
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.barcode.includes(searchTerm);

    const status = getStockStatus(medicine);
    const matchesFilter = 
      filterStatus === 'all' ||
      (filterStatus === 'low' && status === 'low') ||
      (filterStatus === 'expired' && (status === 'expired' || status === 'expiring')) ||
      (filterStatus === 'normal' && status === 'normal');

    return matchesSearch && matchesFilter;
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
      value: `${mockMedicines.reduce((sum, m) => sum + (m.price * m.quantity), 0).toLocaleString()} MAD`,
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
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Ajouter Article</span>
        </button>
      </motion.div>

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom ou code-barres..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">Tous les articles</option>
            <option value="normal">Stock normal</option>
            <option value="low">Stock faible</option>
            <option value="expired">Expirations</option>
          </select>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Article</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Code-barres</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Stock</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Prix</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Expiration</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((medicine, index) => {
                const status = getStockStatus(medicine);
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
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Barcode className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400 font-mono text-sm">{medicine.barcode}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
                        {medicine.quantity} {medicine.unit}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900 dark:text-gray-100">
                        {medicine.price.toFixed(2)} MAD
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
                        <button className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded">
                          <Plus className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded">
                          <TrendingDown className="w-4 h-4" />
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