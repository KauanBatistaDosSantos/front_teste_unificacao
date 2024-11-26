import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  public breadcrumbs$ = this.breadcrumbs.asObservable();

  constructor(private router: Router) {
    // Monitorar mudanças de rota
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs = this.createBreadcrumbs(root);
        this.breadcrumbs.next(breadcrumbs);
      });
  }

  /**
   * Cria os breadcrumbs recursivamente com base no snapshot da rota.
   * @param route - Snapshot da rota atual
   * @param url - Caminho acumulado da URL
   * @param breadcrumbs - Array de breadcrumbs
   */
  private createBreadcrumbs(
    route: ActivatedRouteSnapshot,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    // Obter dados e URL da rota
    const { data, url: routeUrl, params } = route;

    if (data['breadcrumb']) {
      // Monta o caminho completo da URL
      const path = routeUrl.map(segment => segment.path).join('/');
      const fullUrl = `${url}/${path}`;

      // Define o rótulo
      let label = data['breadcrumb'];
      if (params && params['id']) {
        label = label.replace(':id', params['id']);
      }
      if (params && params['categoria']) {
        label = label.replace(':categoria', params['categoria']);
      }

      breadcrumbs.push({ label, url: fullUrl });
    }

    // Chama recursivamente para rotas filhas
    if (route.firstChild) {
      return this.createBreadcrumbs(route.firstChild, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
